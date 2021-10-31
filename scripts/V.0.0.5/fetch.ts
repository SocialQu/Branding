import { iTweet, iReply, iFollower, iUser, iTopic, iFetchedData } from './types/fetch'
import { iRawTweet, iRawMetrics, iRawFollower, iAuth } from './types'
import Twitter, { TwitterOptions } from 'twitter-lite'
import { MongoClient } from 'mongodb'
import { promises as fs } from 'fs'

require('dotenv').config()
export const subscribersFile = './data/subscribers.json'


const subdomain = 'api'
const version = '1.1'

const consumer_key = process.env.consumer_key as string
const consumer_secret = process.env.consumer_secret as string



const getUser = async(client:Twitter):Promise<iUser> => {
    const auth:iAuth = await client.get('/account/verify_credentials')
    const { id, name, screen_name, followers_count, profile_image_url:image } = auth

    const user:iUser = { id, name, screen_name, followers_count, image }
    return user
}


interface iGetTweets { tweets:iTweet[], replies:iReply[] }
const getTweets = async(client:Twitter, metricsClient:Twitter):Promise<iGetTweets> => {
    let fetchedTweets:iTweet[] = []
    let max_id:BigInt = BigInt(0)
    const fields = 'fields=organic_metrics,created_at'

    for (const x of [...Array(10)]) {
        console.log('Fetch', max_id)
        const count = 100

        const rawTweets:iRawTweet[] =  !max_id
            ? await client.get(`/statuses/user_timeline.json?count=${count}`) 
            : await client.get(`/statuses/user_timeline.json?count=${count}&max_id=${max_id}`)

        const noRetweets = rawTweets.filter(({ retweeted }) => !retweeted)
        if(!noRetweets.length) break

        const ids:string = noRetweets.map(({ id_str }) => id_str).join(',')
        max_id = (BigInt(ids.split(',')[ids.split(',').length - 1]) - BigInt(1))
        const metricsUrl = `tweets?ids=${ids}&tweet.${fields}`

        const { data:metrics }:{ data: iRawMetrics[]} = await metricsClient.get(metricsUrl)
        if (!metrics)  break

        const tweetsWithMetrics = noRetweets.map((t) => ({
            ...t,
            metrics: metrics.find(({ id }) => t.id_str === id) as iRawMetrics
        }))

        const mappedTweets:iTweet[] = tweetsWithMetrics.filter(({ metrics }) => metrics).map(t => ({
            id: t.id_str,
            text: t.metrics.text,
            isReply: !!t.in_reply_to_status_id,
            datetime: t.created_at,
            metrics:{
                likes: t.metrics.organic_metrics.like_count,
                replies: t.metrics.organic_metrics.reply_count,
                retweets: t.metrics.organic_metrics.retweet_count,
                impressions: t.metrics.organic_metrics.impression_count,
                visits: t.metrics.organic_metrics.user_profile_clicks,
                clicks: t.metrics.organic_metrics.url_link_clicks || 0
            },
            userId:t.in_reply_to_user_id_str,
            userName:t.in_reply_to_screen_name
        }))

        fetchedTweets = [...fetchedTweets, ...mappedTweets]
    }

    const tweets = fetchedTweets.filter(({ isReply }) => !isReply)
    const replies = fetchedTweets.filter(({ isReply }) => isReply) as iReply[]

    return { tweets, replies }
}


const getFollowers = async(client:Twitter):Promise<iFollower[]> => {
    const { users }:{ users:iRawFollower[] } = await client.get('/followers/list.json?')
    const followers:iFollower[] = users.map(user => ({
        id: user.id,
        name: user.name,
        bio: user.description,
        handle: user.screen_name,
        tweets: user.statuses_count,
        following: user.friends_count,
        followers: user.followers_count,
        image:user.profile_image_url_https
    }))

    return followers
}


const getTopics = async():Promise<iTopic[]> => {
    const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`

    const client = new MongoClient(uri)
    await client.connect()

    const Topics = client.db('Cortazar').collection('topics')
    const topics:iTopic[] = await Topics.find().toArray()

    await client.close()

    const generateColor = () => Math.floor(Math.random()*16777215).toString(16);
    const coloredTopics = topics.map(topic => ({...topic, color:generateColor() }))

    return coloredTopics
}


interface iGetTwitterClients { access_token_key:string, access_token_secret:string }
const getTwitterClients = ({ access_token_key, access_token_secret }: iGetTwitterClients) => {
    const options:TwitterOptions = { consumer_key, consumer_secret, access_token_key, access_token_secret }
    const client = new Twitter({...options, subdomain, version })
    const metricsClient = new Twitter({ ...options, version:'2', extension:false })
    
    return { client, metricsClient }
}

export interface iSubscriber extends iGetTwitterClients { screen_name:string }
export const fetchData = async({ access_token_key, access_token_secret }:iSubscriber):Promise<iFetchedData> => {  
    const { client, metricsClient } = getTwitterClients({ access_token_key, access_token_secret })

    const user = await getUser(client)
    const { tweets, replies } = await getTweets(client, metricsClient)
    const followers = await getFollowers(client)
    const topics = await getTopics()

    return { user, tweets, replies, followers, topics }
}

interface iFetchMentions extends iGetTwitterClients { mentionName:string }
export const fetchMentions = async(input : iFetchMentions):Promise<string> => {
    const { metricsClient } = getTwitterClients(input)

    const { mentionName } = input
    const url = `users/by?usernames=${mentionName}&user.fields=profile_image_url`
    const { data } = await metricsClient.get(url)

    console.log(data)
    await fs.writeFile('./data/following.json', data)

    return ''
}


export const fetchSubscribers = async() => {
    const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`

    const client = new MongoClient(uri)
    await client.connect()

    const db = process.env.subscribers_collection
    const collection = process.env.subscribers_db as string
    const Subscribers = client.db(db).collection(collection)

    const subscribers = await Subscribers.find().toArray()
    await client.close()

    const subscribersData = JSON.stringify(subscribers)

    await fs.writeFile(subscribersFile, subscribersData)
    return subscribers
}
