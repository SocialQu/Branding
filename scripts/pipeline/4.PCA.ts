// npx ts-node 4.PCA

import tweets from '../data/training/embeddedTweets.json'
import { promises as fs } from 'fs'
import { PCA } from 'ml-pca'

const trainPCA = async() => {
    const nonReplies = tweets.filter(({ isReply }) => !isReply)
    const embeddings = nonReplies.map(({ embeddings }) => embeddings)
    const pca = new PCA(embeddings)
    await fs.writeFile('../data/pca.json', JSON.stringify(pca))
}

trainPCA()
