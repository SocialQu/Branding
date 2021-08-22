// npx ts-node 3.Classify

import tweets from '../data/training/embeddedTweets.json'
import topics from '../data/training/topics.json'
import { iEmbeddedTweet } from './2.Analysis'
import { promises as fs } from 'fs'


const findTopic = ({embeddings}:iEmbeddedTweet):string => {
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
const classify = async():Promise<iLabeledTweet[]> => {
    const nonReplies = tweets.filter(({ isReply }) => !isReply)
    const labeledTweets = nonReplies.map(t => ({...t, topic:findTopic(t)}))

    labeledTweets.map(({ text, topic}) => console.log(`${topic}: ${text}`))
    await fs.writeFile('../data/training/labeledTweets.json', JSON.stringify(labeledTweets))
    return labeledTweets
}


classify()
