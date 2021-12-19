import { iLabeledTweet } from './labeled'


export interface iEmbeddedTweet extends iLabeledTweet { embeddings:number[] }
export interface iReducedTweet extends iLabeledTweet { reduced:number[] }

interface iClusteredTweet extends iReducedTweet {
    embeddingsCluster: number
    engagementsCluster: number
    featuresCluster: number
}

interface iClassifiedTweet extends iClusteredTweet { topic:string }
