import { kMeansCluster, zScore, mean, standardDeviation } from 'simple-statistics'
import { iReducedTweet } from './types/embeddings'
import { iLabeledTweet } from './types/labeled'
import tweets from './data/reducedTweets.json'


const getEmbeddingsClusters = (tweets:iReducedTweet[]) => {
    const embeddings = tweets.map(({ reduced }) => reduced)
    const { labels, centroids } = kMeansCluster(embeddings, 9)
    return labels    
}

const getZScoreParams = (tweets:iLabeledTweet[], metric:keyof iLabeledTweet) => {
    const values = tweets.map(t => t[metric] as number)
    return { mean:mean(values), sd:standardDeviation(values) }
}

const getEngagementClusters = (tweets:iReducedTweet[]) => {
    const likeStats = getZScoreParams(tweets, 'likes')
    const retweetStats = getZScoreParams(tweets, 'retweets')
    const replyStats = getZScoreParams(tweets, 'replies')
    const visitStats = getZScoreParams(tweets, 'visits')
}
