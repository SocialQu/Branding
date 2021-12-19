import { UniversalSentenceEncoder as iModel, load } from '@tensorflow-models/universal-sentence-encoder'
import { iEmbeddedTweet } from './types/embeddings'
import { iLabeledTweet } from './types/labeled'
import { writeFile } from 'fs/promises'
import { PCA } from 'ml-pca'


const embedTweets = async(tweets:iLabeledTweet[]):Promise<iEmbeddedTweet[]> => {
    const model = await load()
    const texts = tweets.map(({ text }) => text)

    const tensors = await model.embed(texts)
    const embeddings = tensors.arraySync()

    const embeddedTweets = tweets.map((t,i) => ({...t, embeddings:embeddings[i] }))

    const embeddedData = JSON.stringify(embedTweets)
    await writeFile('./data/embeddedTweets.json', embeddedData)

    return embeddedTweets
}


const reduceTweets = async(tweets:iEmbeddedTweet[]):Promise<void> => {
    const embeddings = tweets.map(({ embeddings }) => embeddings)
    const pca = new PCA(embeddings)

    const pcaData = pca.toJSON()
    await writeFile('./data/PCA.json', JSON.stringify(pcaData))
}

const index = async(tweets:iLabeledTweet[]) => {
    const embedded = await embedTweets(tweets)
    const reduced = await reduceTweets(embedded)
}
