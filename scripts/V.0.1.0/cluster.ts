import { zScore, mean, standardDeviation } from 'simple-statistics'
import { kMeansCluster } from 'simple-statistics'
import tweets from './data/reducedTweets.json'
import { iLabeledTweet } from './types/labeled'

const getEmbeddingsClusters = () => {
    const embeddings = tweets.map(({ reduced }) => reduced)
    const { labels, centroids } = kMeansCluster(embeddings, 9)
    return labels    
}

const getZScoreParams = (tweets:iLabeledTweet[], metric:keyof iLabeledTweet) => {
    const values = tweets.map(t => t[metric] as number)
    return { mean:mean(values), sd:standardDeviation(values) }
}

const getEngagementClusters = () => {}
