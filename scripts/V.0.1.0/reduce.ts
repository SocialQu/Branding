import { UniversalSentenceEncoder as iModel } from '@tensorflow-models/universal-sentence-encoder'
import { iEmbeddedTweet } from './types/embeddings'
import { iLabeledTweet } from './types/labeled'


const embedTweets = async(tweets:iLabeledTweet[], model:iModel):Promise<iEmbeddedTweet[]> => {
    const texts = tweets.map(({ text }) => text)

    const tensors = await model.embed(texts)
    const embeddings = tensors.arraySync()

    const embeddedTweets = tweets.map((t,i) => ({...t, embeddings:embeddings[i] }))
    return embeddedTweets
}
