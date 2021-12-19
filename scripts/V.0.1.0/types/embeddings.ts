import { iLabeledTweet } from './labeled'

export interface iEmbeddedTweet extends iLabeledTweet {
    embeddings: number[]
    reducedEmbeddings: number[] // 12 dimmensions
}

interface iClusteredTweet extends iEmbeddedTweet {
    embeddingsCluster: number
    engagementsCluster: number
    featuresCluster: number
}

interface iClassifiedTweet extends iClusteredTweet { topic: string }
