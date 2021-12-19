import { kMeansCluster } from 'simple-statistics'
import tweets from './data/reducedTweets.json'


const embeddings = tweets.map(({ reduced }) => reduced)
const { labels, centroids } = kMeansCluster(embeddings, 9)
console.log(labels, centroids)
