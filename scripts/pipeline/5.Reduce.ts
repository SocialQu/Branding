// npx ts-node 5.Reduce

import tweets from '../data/training/labeledTweets.json'
import { iLabeledTweet } from './3.Classify'
import pcaModel from '../data/pca.json'
import { PCA, IPCAModel } from 'ml-pca'
import { promises as fs } from 'fs'


interface iReducedTweet extends iLabeledTweet { 
    location:{
        x: number
        y: number
    }
}

const reduce = async():Promise<iReducedTweet[]> => {
    const pca = PCA.load(pcaModel as IPCAModel)
    const embeddings = tweets.map(({ embeddings }) => embeddings)

    const locations = pca.predict(embeddings, {nComponents: 2}).to2DArray()
    const reducedTweets = tweets.map((t, i) => ({...t, location:{ x:locations[i][0], y:locations[i][1] }}))

    await fs.writeFile('../data/training/reducedTweets.json', JSON.stringify(reducedTweets))
    reducedTweets.map(({ topic, location}) => console.log(`${topic}: [${location.x}, ${location.y}]`))
    return reducedTweets
}


reduce()
