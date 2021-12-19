import { iLabeledTweet } from './labeled'

export interface iEmbeddedTweet extends iLabeledTweet { embeddings:number[] }

interface iReducedTweet extends iEmbeddedTweet { reduced:number[] }

interface iClusteredTweet extends iReducedTweet {
    embeddingsCluster: number
    engagementsCluster: number
    featuresCluster: number
}

interface iClassifiedTweet extends iClusteredTweet { topic:string }
