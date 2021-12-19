import { UniversalSentenceEncoder as iModel, load } from '@tensorflow-models/universal-sentence-encoder'
import { iEmbeddedTweet } from './types/embeddings'
import { iLabeledTweet } from './types/labeled'
import { writeFile } from 'fs/promises'
import { PCA } from 'ml-pca'


const embedTweets = async(tweets:iLabeledTweet[], model:iModel):Promise<iEmbeddedTweet[]> => {
    const texts = tweets.map(({ text }) => text)

    const tensors = await model.embed(texts)
    const embeddings = tensors.arraySync()

    const embeddedTweets = tweets.map((t,i) => ({...t, embeddings:embeddings[i] }))
    return embeddedTweets
}


const reduceTweets = (tweets:iEmbeddedTweet[]):void => {
    const embeddings = tweets.map(({ embeddings }) => embeddings)
    const pca = new PCA(embeddings)

    const pcaData = pca.toJSON()
    writeFile('./data/PCA.json', JSON.stringify(pcaData))
}

const reduce = async(tweets:iLabeledTweet[]) => {
    const model = await load()
    const embeddedTweets = await embedTweets(tweets, model)
}
