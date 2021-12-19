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

linearRegression(tweets as iReducedTweet[])
