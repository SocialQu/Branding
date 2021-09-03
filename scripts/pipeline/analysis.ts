import { load, UniversalSentenceEncoder as iModel } from '@tensorflow-models/universal-sentence-encoder'
import { iFollower, iTopic, iTweet } from '../types/fetch'
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


const findTopic = ({embeddings}:{embeddings:number[]}, topics:iTopic[]):string => {
    const getSimilarity = (center:number[], embedding: number[]) => {
        if (center.length !== embedding.length) return Infinity
        const delta = center.reduce((d, i, idx) => d + Math.abs(i - embedding[idx]), 0)
        return delta
    }

    topics.sort(({embeddings:a}, {embeddings:b}) => 
        getSimilarity(embeddings, a) > getSimilarity(embeddings, b) ? 1 : -1
    )

    return topics[0].topic
}


export interface iLabeledTweet extends iEmbeddedTweet { topic:string }
const classifyTweets = async(tweets:iEmbeddedTweet[], topics:iTopic[]):Promise<iLabeledTweet[]> => {
    const labeledTweets = tweets.map(t => ({...t, topic:findTopic(t, topics)}))
    return labeledTweets
}


export interface iLabeledFollower extends iEmbeddedFollower { niche:string }
const classifyFollowers = async(followers:iEmbeddedFollower[], topics:iTopic[]):Promise<iLabeledFollower[]> => {
    const labeledFollowers = followers.map(t => ({...t, niche:findTopic(t, topics)}))
    return labeledFollowers
}

interface iReducedTweet extends iLabeledTweet { location:{ x:number, y:number } }
const reduceTweets = (tweets:iLabeledTweet[]):iReducedTweet[] => {
    const embeddings = tweets.map(({ embeddings }) => embeddings)
    const pca = new PCA(embeddings)

    const locations = pca.predict(embeddings, {nComponents: 2}).to2DArray()
    const reducedTweets = tweets.map((t, i) => ({...t, location:{ x:locations[i][0], y:locations[i][1] }}))

    return reducedTweets
}


interface iAnalyzeData { tweets:iTweet[], followers:iFollower[], topics:iTopic[] } 
export interface iAnalysisData { tweets:iReducedTweet[], followers:iLabeledFollower[] }
export const analyzeData = async({ tweets, followers, topics }:iAnalyzeData):Promise<iAnalysisData>  => {
    const model = await load()

    const embededTweets = await embedTweets(tweets, model)
    const embededFollowers = await embedBios(followers, model)

    const labeledTweets = await classifyTweets(embededTweets, topics)
    const labeledFollowers = await classifyFollowers(embededFollowers, topics)

    const reducedTweets = reduceTweets(labeledTweets)
    return { tweets:reducedTweets, followers:labeledFollowers }
}

