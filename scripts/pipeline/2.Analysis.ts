// npx ts-node 2.Analysis

import * as use from '@tensorflow-models/universal-sentence-encoder'
import tweets from '../data/training/tweets.json'
import { iTweet } from './1.Fetch'

import { promises as fs } from 'fs'
import '@tensorflow/tfjs-node'


export interface iEmbeddedTweet extends iTweet { embeddings:number[] }

const embedTweets = async():Promise<iEmbeddedTweet[]> => {
    const model = await use.load()
    const texts = tweets.map(({ text }) => text)

    const tensors = await model.embed(texts)
    const embeddings = tensors.arraySync()

    // embeddings.map(([i]) => console.log('First dim:', i))
    const embeddedTweets = tweets.map((t,i) => ({...t, embeddings:embeddings[i] }))

    await fs.writeFile('../data/training/embeddedTweets.json', JSON.stringify(embeddedTweets))
    return embeddedTweets
}


embedTweets().catch(console.log)
