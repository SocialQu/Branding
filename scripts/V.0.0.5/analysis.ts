import { load, UniversalSentenceEncoder as iModel } from '@tensorflow-models/universal-sentence-encoder'
import { iFetchedData, iFollower, iTopic, iTweet, TextColor } from './types/fetch'
import { iAggregateData } from './aggregate'

import '@tensorflow/tfjs-node'
import { PCA } from 'ml-pca'



interface iEmbeddedTweet extends iTweet { embeddings:number[] }
const embedTweets = async(tweets:iTweet[], model:iModel):Promise<iEmbeddedTweet[]> => {
    const texts = tweets.map(({ text }) => text)

    const tensors = await model.embed(texts)
    const embeddings = tensors.arraySync()

    const embeddedTweets = tweets.map((t,i) => ({...t, embeddings:embeddings[i] }))
    return embeddedTweets
}



interface iEmbeddedFollower extends iFollower { embeddings:number[] }
const embedBios = async(followers:iFollower[], model:iModel):Promise<iEmbeddedFollower[]> => {
    const bios = followers.map(({ bio }) => bio)

    const tensors = await model.embed(bios)
    const embeddings = tensors.arraySync()
    
    const embeddedFollowers = followers.map((t,i) => ({...t, embeddings:embeddings[i] }))
    return embeddedFollowers
}


interface iColoredTopic { topic:string, color:string, niche:string, textColor:TextColor }
const findTopic = ({embeddings}:{embeddings:number[]}, topics:iTopic[]):iColoredTopic => {
    const getSimilarity = (center:number[], embedding: number[]) => {
        if (center.length !== embedding.length) return Infinity
        const delta = center.reduce((d, i, idx) => d + Math.abs(i - embedding[idx]), 0)
        return delta
    }

    topics.sort(({embeddings:a}, {embeddings:b}) => 
        getSimilarity(embeddings, a) > getSimilarity(embeddings, b) ? 1 : -1
    )

    return { topic:topics[0].topic, color:topics[0].color, niche:topics[0].topic, textColor:topics[0].text }
}


export interface iLabeledTweet extends iEmbeddedTweet { topic:string, color:string, textColor:TextColor }
const classifyTweets = async(tweets:iEmbeddedTweet[], topics:iTopic[]):Promise<iLabeledTweet[]> => {
    const labeledTweets = tweets.map(t => ({...t, ...findTopic(t, topics) }))
    return labeledTweets
}


export interface iLabeledFollower extends iEmbeddedFollower { niche:string, color:string, textColor:TextColor }
const classifyFollowers = async(followers:iEmbeddedFollower[], topics:iTopic[]):Promise<iLabeledFollower[]> => {
    const labeledFollowers = followers.map(t => ({...t, ...findTopic(t, topics)}))
    return labeledFollowers
}

export interface iReducedTweet extends iLabeledTweet { location:{ x:number, y:number } }
const reduceTweets = (tweets:iLabeledTweet[]):iReducedTweet[] => {
    const embeddings = tweets.map(({ embeddings }) => embeddings)
    const pca = new PCA(embeddings)

    const locations = pca.predict(embeddings, {nComponents: 2}).to2DArray()
    const reducedTweets = tweets.map((t, i) => ({...t, location:{ x:locations[i][0], y:locations[i][1] }}))

    return reducedTweets
}


export interface iAnalysisData { tweets:iReducedTweet[], followers:iLabeledFollower[] }
export const analyzeData = async(data:iFetchedData):Promise<iAggregateData>  => {
    const { tweets, followers, topics } = data
    const model = await load()

    const embededTweets = await embedTweets(tweets, model)
    const embededFollowers = await embedBios(followers, model)

    const labeledTweets = await classifyTweets(embededTweets, topics)
    const labeledFollowers = await classifyFollowers(embededFollowers, topics)

    // const reducedTweets = reduceTweets(labeledTweets)
    return { ...data, tweets:labeledTweets, followers:labeledFollowers }
}

