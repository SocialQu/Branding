import MLR from 'ml-regression-multivariate-linear'
import { iReducedTweet } from './types/embeddings'
import tweets from './data/reducedTweets.json'
import { iOutputs } from './types/labeled'
import { writeFile } from 'fs/promises'
import { labels } from './regression'


const linearRegression = (tweets:iReducedTweet[]):number[][] => {
    const x = tweets.map(({ reduced }) => reduced)
    const y = tweets.map((t) => labels.map((f) => t[f]))

    const { weights } = new MLR(x, y)
    const results = labels.reduce((d, k, i) => ({ 
        ...d, 
        [k]: tweets[i].reduced.reduce((e, _, idx) => ({...e, [idx]: weights[idx][i] }), {}) 
    }), {})

    const regressionData = JSON.stringify(results)
    writeFile('./data/regression/embeddings.json', regressionData)

    return weights
}

interface iFindTweets { tweets:iReducedTweet[], weights:number[][] }
interface iWeight { label: keyof iOutputs, value: number }
interface iTopTweet { text:string, engagements:number, value:number }
interface iTopTweets { dimension:number, weight:iWeight[], topTweets:iTopTweet[] } // Top tweets by dimension
const findTweets = ({ tweets, weights }:iFindTweets):iTopTweets[] => tweets[0].reduced.map(( _, i) => i).map((i) => {
    const sorted = tweets.sort(({ reduced:a }, { reduced:b }) => a[i] > b[i] ? -1 : 1)
    const topTweets = sorted.filter((_, i) => i < 10).map(({ text, engagements, reduced }) => ({
        text, engagements, value:reduced[i] 
    }))

    const weight = labels.map((label, idx) => ({label, value:weights[i][idx]}))
    return { dimension:i, weight, topTweets }
})

const analyzeEmbeddings = (tweets:iReducedTweet[]) => {
    const weights = linearRegression(tweets)
    const results = findTweets({ tweets, weights })
    results.map(r => console.log(r))
}

analyzeEmbeddings(tweets as iReducedTweet[])
