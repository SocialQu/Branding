import { iClassifiedTweet, iClusteredTweet } from './types/embeddings'
import colors from '../V.0.0.5/data/colors.json'
import tweets from './data/clusteredTweets.json'

import { PCA, IPCAModel } from 'ml-pca' 
import { writeFile } from 'fs/promises'
import { MongoClient } from 'mongodb'
import pcaModel from './data/PCA.json'


interface iTopic {
    _id: string
    topic: string
    color: string
    center: number[]
    reduced: number[]
    embeddings: number[]
}

export const fetchTopics = async():Promise<iTopic[]> => {
    const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`

    const client = new MongoClient(uri)
    await client.connect()

    const Topics = client.db('Cortazar').collection('topics')
    const topics:iTopic[] = await Topics.find().toArray()

    await client.close()

    const findColor = ({topic}:iTopic) => colors.find(({ topic:t }) => topic === t)?.color || ''
    const coloredTopics = topics.map(topic => ({...topic, color:findColor(topic) })) as iTopic[]

    const pca = PCA.load(pcaModel as IPCAModel)
    const topicEmbeddings = topics.map(({ embeddings }) => embeddings)
    const reducedEmbeddings = pca.predict(topicEmbeddings, { nComponents:12 }).to2DArray()

    const reducedTopics = coloredTopics.map((t, i) => ({ ...t, reduced:reducedEmbeddings[i] }))

    const topicsData = JSON.stringify(reducedTopics)
    await writeFile('./data/topics.json', topicsData)

    return reducedTopics
}


const euclideanDistance = (A:number[], B:number[]) => A.reduce((d, i, idx) => d + (i - B[idx])**2, 0)**(1/2)
const minDistance = (A:number[], M:number[][]) => M.reduce((d, i, idx) => {
    const distance = euclideanDistance(A, i)
    return distance < d.min ? { key:idx, min:distance } : d
}, { key:0, min:Infinity } as { key:number, min:number }).key

const classifyTopics = (tweets:iClusteredTweet[], topics:iTopic[]):iClassifiedTweet[] => {
    const topicEmbeddings = topics.map(({ reduced }) => reduced)
    const classifiedTweets = tweets.map(t => {
        const idx = minDistance(t.reduced, topicEmbeddings) 
        const { topic, color } = topics[idx]
        return { ...t, topic, color }
    })

    return classifiedTweets
}
