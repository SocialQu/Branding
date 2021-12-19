import MLR from 'ml-regression-multivariate-linear'
import { iReducedTweet } from './types/embeddings'
import tweets from './data/reducedTweets.json'
import { writeFile } from 'fs/promises'
import { labels } from './regression'


const linearRegression = (tweets:iReducedTweet[]) => {
    const x = tweets.map(({ reduced }) => reduced)
    const y = tweets.map((t) => labels.map((f) => t[f]))

    const { weights } = new MLR(x, y)
    const results = labels.reduce((d, k, i) => ({ 
        ...d, 
        [k]: tweets[i].reduced.reduce((e, _, idx) => ({...e, [idx]: weights[idx][i] }), {}) 
    }), {})

    const regressionData = JSON.stringify(results)
    writeFile('./data/regression/embeddings.json', regressionData)
}

interface iFindTweets { tweets:iReducedTweet[], weights:number[][] }
interface iTopTweets { dimension:number, weight:number[], texts:string[] } // Top tweets by dimension
const findTweets = ({ tweets, weights }:iFindTweets):iTopTweets[] => tweets[0].reduced.map(( _, i) => i).map((i) => {
    const sorted = tweets.sort(({ reduced:a }, { reduced:b }) => a[i] > b[i] ? 1 : -1)
    const texts = sorted.filter((_, i) => i < 10).map(({ text }) => text)
    return { dimension:i, weight: weights[i], texts }
})


linearRegression(tweets as iReducedTweet[])
