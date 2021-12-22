import colors from '../V.0.0.5/data/colors.json'
import tweets from './data/clusteredTweets.json'
import { writeFile } from 'fs/promises'
import { MongoClient } from 'mongodb'


interface iTopic {
    _id: string
    topic: string
    color?: string
    embeddings: number[]
    center: number[]
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

    const colorsData = JSON.stringify(coloredTopics.map(({ color, topic }) => ({ color, topic })))
    await writeFile('./data/topics.json', colorsData)

    return coloredTopics
}
