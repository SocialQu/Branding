import { iLabeledTweet } from './labeled'


export interface iEmbeddedTweet extends iLabeledTweet { embeddings:number[] }
export interface iReducedTweet extends iLabeledTweet { reduced:number[] }

export interface iClusteredTweet extends iReducedTweet {
    featuresCluster: number
    embeddingsCluster: number
    engagementsCluster: number
    cluster: number
}

export interface iClassifiedTweet extends iClusteredTweet { topic:string }
