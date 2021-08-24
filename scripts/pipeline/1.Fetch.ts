// npx ts-node 1.Fetch

import { iRawTweet, iMetrics, iRawFollower, iAuth } from '../types'
import Twitter, { TwitterOptions } from 'twitter-lite'
import { MongoClient } from 'mongodb'
import { promises as fs } from 'fs'

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


export interface iTweet {
    id: number
    text: string
    link?: string
    metrics:{
        likes: number
        replies: number
        retweets: number
        clicks: number
        visits: number
    }
    isReply:boolean
}


const getLink = ({ entities }:iRawTweet) => !entities.urls[0]?.expanded_url.includes('https://twitter.com') 
    ? entities.urls[0]?.expanded_url 
    : undefined

const getTweets = async():Promise<iTweet[]> => {
    const rawTweets:iRawTweet[] = await client.get('/statuses/user_timeline.json?count=100')

    const filteredTweets = rawTweets.filter(({ retweeted }) => !retweeted)
    console.log('Timeline fetched.')

    const ids:string = filteredTweets.map(({ id_str }) => id_str).join(',')
    // console.log(ids)

    const fields = 'fields=organic_metrics,created_at'
    const metricsUrl = `tweets?ids=${ids}&tweet.${fields}`
    // console.log('metricsUrl', metricsUrl)

    const { data:metrics }:{ data: iMetrics[]} = await metricsClient.get(metricsUrl)
    console.log('Metrics fetched.')

    const tweetsWithMetrics = filteredTweets.map((t) => ({
        ...t, 
        metrics: metrics.find(({ id }) => t.id_str === id) as iMetrics
    }))

    const tweets:iTweet[] = tweetsWithMetrics.filter(({ metrics }) => metrics).map(t => ({
        id: t.id,
        text: t.metrics.text,
        link: getLink(t),
        datetime: t.created_at,
        metrics:{
            likes: t.metrics.organic_metrics.like_count,
            replies: t.metrics.organic_metrics.reply_count,
            retweets: t.metrics.organic_metrics.retweet_count,
            impressions: t.metrics.organic_metrics.impression_count,
            visits: t.metrics.organic_metrics.user_profile_clicks,
            clicks: t.metrics.organic_metrics.url_link_clicks || 0
        },
        isReply: !!t.in_reply_to_status_id
    }))

    await fs.writeFile('../data/training/tweets.json', JSON.stringify(tweets))
    return tweets
}

// getTweets().catch(console.log)

interface iFollower {
    id: number
    name: string
    bio: string
    tweets: number
    followers: number
    following: number
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

    console.log('Followers', followers)

    await fs.writeFile('../data/training/followers.json', JSON.stringify(followers))
    return followers
}


// getFollowers().catch(console.log)


interface iTopic {
    _id: string
    topic: string
    embeddings: number[]
    center: [number, number]
}

const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`

const fetchTopics = async():Promise<iTopic[]> => {
    const client = new MongoClient(uri)
    await client.connect()

    const Topics = client.db('Cortazar').collection('topics')
    const topics:iTopic[] = await Topics.find().toArray()

    console.log('topics', topics.length)
    console.log('Topic:', topics[0])

    await fs.writeFile('../data/training/topics.json', JSON.stringify(topics))
    await client.close()

    return topics
}

// fetchTopics().catch(console.log)


export interface iUser {
    id: number
    name: string
    screen_name: string
    followers_count: number
}

const getUser = async():Promise<iUser> => {
    const { id, name, screen_name, followers_count }:iAuth = await client.get('/account/verify_credentials')

    const user:iUser = { id, name, screen_name, followers_count }
    console.log('User:', user)

    await fs.writeFile('../data/training/user.json', JSON.stringify(user))
    return user
}


// getUser().catch(console.log)
