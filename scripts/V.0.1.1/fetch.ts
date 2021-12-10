import { getTwitterClients, iTwitterClients } from '../V.0.0.5/fetch'
import { iRawTweet, iRawMetrics } from '../V.0.0.5/types'
import { iMetrics } from '../V.0.0.5/types/fetch'
import { MongoClient } from 'mongodb'

require('dotenv').config()


export interface iTweet {
    id: string
    text: string
    datetime: string
    isReply: boolean
    metrics?: iMetrics
    replyTo?: string
}

const fetchTweets = async({ access_token_key, access_token_secret }: iTwitterClients) => {
    const { client, metricsClient } = getTwitterClients({ access_token_key, access_token_secret })
    const rawTweets:iRawTweet[] = await client.get(`/statuses/user_timeline.json?count=100`) 

    const noRetweets = rawTweets.filter(({ retweeted }) => !retweeted)
    if(!noRetweets.length) return

    const ids:string = noRetweets.map(({ id_str }) => id_str).join(',')

    const fields = 'fields=organic_metrics,created_at'
    const metricsUrl = `tweets?ids=${ids}&tweet.${fields}`

    const { data:metrics }:{ data: iRawMetrics[]} = await metricsClient.get(metricsUrl)
    if (!metrics) return

    const tweetsWithMetrics = noRetweets.map((t) => ({
        ...t,
        metrics: metrics.find(({ id }) => t.id_str === id) as iRawMetrics
    }))

    const tweets:iTweet[] = rawTweets.map(t => {
        const tweet:iTweet = {
            id: t.id_str,
            text: t.text,
            isReply: !!t.in_reply_to_status_id,
            datetime: t.created_at
        }

        const tweetWithMetrics = tweetsWithMetrics.find(({ id_str }) => id_str === t.id_str)

        if(tweetWithMetrics){
            const { metrics } = tweetWithMetrics

            tweet.metrics = {
                likes: metrics.organic_metrics.like_count,
                replies: metrics.organic_metrics.reply_count,
                retweets: metrics.organic_metrics.retweet_count,
                impressions: metrics.organic_metrics.impression_count,
                visits: metrics.organic_metrics.user_profile_clicks,
                clicks: metrics.organic_metrics.url_link_clicks || 0
            }
        }

        return tweet

    })

    return tweets
}


interface iUser {
    screen_name:string
    access_token_key:string
    access_token_secret:string
}

const fetchUsers = async() => {
    const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`

    const client = new MongoClient(uri)
    await client.connect()

    const db = process.env.subscribers_collection
    const collection = process.env.subscribers_db as string
    const Users = client.db(db).collection(collection)

    const users:iUser[] = await Users.find().toArray()

    const names = users.map(({ screen_name:name }) => name)
    const setOfNames = [...new Set(names)]

    const uniqueUsers = setOfNames.map(name => users.find(({ screen_name }) => screen_name === name))

    return uniqueUsers as iUser[]
}




const fetch = async() => {
    const users = await fetchUsers()
}
