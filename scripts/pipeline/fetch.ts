// npx ts-node fetch
import Twitter, { TwitterOptions } from 'twitter-lite'
import { iRawTweet, iMetrics } from '../types'
import { promises as fs } from 'fs'

require('dotenv').config()


const subdomain = 'api'
const version = '1.1'

const consumer_key = process.env.consumer_key as string
const consumer_secret = process.env.consumer_secret as string
console.log(consumer_key)

const access_token_key = process.env.access_token_key as string
const access_token_secret = process.env.access_token_secret as string


const options:TwitterOptions = { consumer_key, consumer_secret, access_token_key, access_token_secret }
const client = new Twitter({...options, subdomain, version })
const metricsClient = new Twitter({ ...options, version:'2', extension:false })


interface iTweet {
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
}


const getLink = ({ entities }:iRawTweet) => !entities.urls[0]?.expanded_url.includes('https://twitter.com') 
    ? entities.urls[0]?.expanded_url 
    : undefined

const getTweets = async():Promise<iTweet[]> => {
    const rawTweets:iRawTweet[] = await client.get('/statuses/user_timeline.json?count=10')
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
        metrics:{
            likes: t.metrics.organic_metrics.like_count,
            replies: t.metrics.organic_metrics.reply_count,
            retweets: t.metrics.organic_metrics.retweet_count,
            impressions: t.metrics.organic_metrics.impression_count,
            visits: t.metrics.organic_metrics.user_profile_clicks,
            clicks: t.metrics.organic_metrics.url_link_clicks || 0
        }
    }))

    await fs.writeFile('../data/training/tweets.json', JSON.stringify(tweets))
    return tweets as iTweet[]
}


getTweets().catch(console.log)
