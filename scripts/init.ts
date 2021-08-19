// npx ts-node init

import Twitter, { TwitterOptions } from 'twitter-lite'
import { iRawTweet, iMetrics } from './types'
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


const getTimeline = async() => {
    const tweets:iRawTweet[] = await client.get('/statuses/user_timeline.json?count=10')
    console.log('Timeline fetched.')

    const ids:string = tweets.filter(({ retweeted }) => !retweeted).map(({ id_str }) => id_str).join(',')
    // console.log(ids)

    const fields = 'fields=organic_metrics,created_at'
    const metricsUrl = `tweets?ids=${ids}&tweet.${fields}`
    // console.log('metricsUrl', metricsUrl)

    const { data:metrics }:{ data: iMetrics[]} = await metricsClient.get(metricsUrl)
    console.log('Metrics fetched.')

    // metrics.map(({ id, text }) => console.log(id, text))
    await fs.writeFile('./data/training/metrics.json', JSON.stringify(metrics))
}


getTimeline()
