import { getTwitterClients, iTwitterClients } from '../V.0.0.5/fetch'
import { iRawTweet, iRawMetrics } from '../V.0.0.5/types'
import { iMetrics } from '../V.0.0.5/types/fetch'


export interface iTweet {
    id: string
    text: string
    datetime: string
    isReply: boolean
    metrics?: iMetrics
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

    return mappedTweets
}
