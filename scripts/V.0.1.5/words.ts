import { load } from '@tensorflow-models/universal-sentence-encoder'
import '@tensorflow/tfjs-node'

import tweets from '../V.0.1.0/data/reducedTweets.json'
import weights from './data/weights.json'


const dotProduct = (X:number[], Y:number[]) => X.reduce((d, x, i)=> d += x*Y[i], 0)

const embedTweets = async(text:string) => {
    const model = await load()
    const words = text.split(' ')
    console.log('words', words)

    const tensors = await model.embed(words)
    const embeddings = tensors.arraySync()

    embeddings.map((e, i) => console.log(words[i], dotProduct(e, weights)))
}

embedTweets('')
