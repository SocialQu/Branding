import { kMeansCluster, zScore, mean, standardDeviation } from 'simple-statistics'
import { iReducedTweet } from './types/embeddings'
import { iLabeledTweet } from './types/labeled'
import tweets from './data/reducedTweets.json'


const getEmbeddingsClusters = (tweets:iReducedTweet[]) => {
    const embeddings = tweets.map(({ reduced }) => reduced)
    const { labels } = kMeansCluster(embeddings, 9)
    return labels    
}

const getZScoreParams = (tweets:iLabeledTweet[], metric:keyof iLabeledTweet) => {
    const values = tweets.map(t => t[metric] as number)
    return { mean:mean(values), sd:standardDeviation(values) }
}

const getEngagementClusters = (tweets:iReducedTweet[]) => {
    const likeStats = getZScoreParams(tweets, 'likes')
    const visitStats = getZScoreParams(tweets, 'visits')
    const clickStats = getZScoreParams(tweets, 'clicks')
    const replyStats = getZScoreParams(tweets, 'replies')
    const retweetStats = getZScoreParams(tweets, 'retweets')
    const impressionStats = getZScoreParams(tweets, 'impressions')

    const normalizedTweets = tweets.map(t => ({
        ...t,
        normalizedMetrics:{
            likes: zScore(t.likes, likeStats.mean, likeStats.sd),
            visits: zScore(t.likes, visitStats.mean, visitStats.sd),
            clicks: zScore(t.likes, clickStats.mean, clickStats.sd),
            replies: zScore(t.likes, replyStats.mean, replyStats.sd),
            retweets: zScore(t.likes, retweetStats.mean, retweetStats.sd),
            impressions: zScore(t.likes, impressionStats.mean, impressionStats.sd),
        }
    }))

    const points = normalizedTweets.map(({ reduced, normalizedMetrics }) => [...reduced, normalizedMetrics])
}
