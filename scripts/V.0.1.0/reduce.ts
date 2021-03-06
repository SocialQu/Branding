import { load } from '@tensorflow-models/universal-sentence-encoder'
import { iEmbeddedTweet, iReducedTweet } from './types/embeddings'
import { iLabeledTweet } from './types/labeled'
import tweets from './data/labeledData.json'
import { writeFile } from 'fs/promises'
import '@tensorflow/tfjs-node'
import { PCA } from 'ml-pca'


const embedTweets = async(tweets:iLabeledTweet[]):Promise<iEmbeddedTweet[]> => {
    const model = await load()
    const texts = tweets.map(({ text }) => text)

    const tensors = await model.embed(texts)
    const embeddings = tensors.arraySync()

    const embeddedTweets = tweets.map((t,i) => ({...t, embeddings:embeddings[i] }))

    const embeddedData = JSON.stringify(embeddedTweets)
    await writeFile('./data/embeddedTweets.json', embeddedData)

    return embeddedTweets
}


const reduceTweets = async(tweets:iEmbeddedTweet[]):Promise<iReducedTweet[]> => {
    const embeddings = tweets.map(({ embeddings }) => embeddings)
    const pca = new PCA(embeddings)

    const pcaData = pca.toJSON()
    await writeFile('./data/PCA.json', JSON.stringify(pcaData))

    const reductions = pca.predict(embeddings, {nComponents: 12}).to2DArray()
    const reducedTweets = tweets.map(({ embeddings, ...t }, i) => ({...t, reduced: reductions[i] }))

    const reducedData = JSON.stringify(reducedTweets)
    await writeFile('./data/reducedTweets.json', reducedData)

    return reducedTweets
}

const index = async(tweets:iLabeledTweet[]) => {
    const embedded = await embedTweets(tweets)
    await reduceTweets(embedded)
}

index(tweets as iLabeledTweet[]).catch(console.log)
