import { iTweet, iFollower, iUser, iTopic, iFetchedData } from '../types/fetch'
import { iRawTweet, iRawMetrics, iRawFollower, iAuth } from '../types'
import Twitter, { TwitterOptions } from 'twitter-lite'
import { MongoClient } from 'mongodb'

require('dotenv').config()


const subdomain = 'api'
const version = '1.1'

const consumer_key = process.env.consumer_key as string
const consumer_secret = process.env.consumer_secret as string

const access_token_key = process.env.access_token_key as string
const access_token_secret = process.env.access_token_secret as string

const options:TwitterOptions = { consumer_key, consumer_secret, access_token_key, access_token_secret }
const client = new Twitter({...options, subdomain, version })
const metricsClient = new Twitter({ ...options, version:'2', extension:false })


const getUser = async():Promise<iUser> => {
    const { id, name, screen_name, followers_count }:iAuth = await client.get('/account/verify_credentials')
    const user:iUser = { id, name, screen_name, followers_count }
    return user
}


const getTweets = async():Promise<iTweet[]> => {
    const rawTweets:iRawTweet[] = await client.get('/statuses/user_timeline.json?count=100')

    const noRetweets = rawTweets.filter(({ retweeted }) => !retweeted)
    const filteredTweets = noRetweets.filter(({ in_reply_to_status_id }) => !in_reply_to_status_id)

    const ids:string = filteredTweets.map(({ id_str }) => id_str).join(',')
    const fields = 'fields=organic_metrics,created_at'
    const metricsUrl = `tweets?ids=${ids}&tweet.${fields}`

    const { data:metrics }:{ data: iRawMetrics[]} = await metricsClient.get(metricsUrl)
    const tweetsWithMetrics = filteredTweets.map((t) => ({
        ...t, 
        metrics: metrics.find(({ id }) => t.id_str === id) as iRawMetrics
    }))

    const tweets:iTweet[] = tweetsWithMetrics.filter(({ metrics }) => metrics).map(t => ({
        id: t.id,
        text: t.metrics.text,
        datetime: t.created_at,
        metrics:{
            likes: t.metrics.organic_metrics.like_count,
            replies: t.metrics.organic_metrics.reply_count,
            retweets: t.metrics.organic_metrics.retweet_count,
            impressions: t.metrics.organic_metrics.impression_count,
            visits: t.metrics.organic_metrics.user_profile_clicks,
            clicks: t.metrics.organic_metrics.url_link_clicks || 0
        }
    }))

    return tweets
}


const getFollowers = async():Promise<iFollower[]> => {
    const { users }:{ users:iRawFollower[] } = await client.get('/followers/list.json?')
    const followers:iFollower[] = users.map(user => ({
        id: user.id,
        name: user.name,
        bio: user.description,
        tweets: user.statuses_count,
        followers: user.followers_count,
        following: user.friends_count
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
    return topics
}



export const fetchData = async():Promise<iFetchedData> => {
    const user = await getUser()
    const tweets = await getTweets()
    const followers = await getFollowers()
    const topics = await getTopics()

    return { user, tweets, followers, topics }
}