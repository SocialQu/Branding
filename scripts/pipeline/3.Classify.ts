// npx ts-node 3.Classify

import { iEmbeddedFollower, iEmbeddedTweet } from './2.Analysis'

import followers from '../data/training/embeddedFollowers.json'
import tweets from '../data/training/embeddedTweets.json'
import topics from '../data/training/topics.json'

import { promises as fs } from 'fs'


const findTopic = ({embeddings}:{embeddings:number[]}):string => {
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
const classifyTweets = async():Promise<iLabeledTweet[]> => {
    const nonReplies = tweets.filter(({ isReply }) => !isReply)
    const labeledTweets = nonReplies.map(t => ({...t, topic:findTopic(t)}))

    labeledTweets.map(({ text, topic}) => console.log(`${topic}: ${text}\n`))
    await fs.writeFile('../data/training/labeledTweets.json', JSON.stringify(labeledTweets))
    return labeledTweets
}

// classifyTweets()


export interface iLabeledFollower extends iEmbeddedFollower { topic:string }
const classifyFollowers = async():Promise<iLabeledFollower[]> => {
    const labeledFollowers = followers.map(t => ({...t, topic:findTopic(t)}))

    labeledFollowers.map(({ bio, topic}) => console.log(`${topic}: ${bio}`))
    await fs.writeFile('../data/training/labeledFollowers.json', JSON.stringify(labeledFollowers))
    return labeledFollowers
}

// classifyFollowers()
