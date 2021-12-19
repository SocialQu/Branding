import { iLabeledTweet } from './labeled'

interface iEmbeddedTweets extends iLabeledTweet {
    embeddings: number[]
    reducedeEmbeddings: number[] // 12 dimmensions
}
