import MLR from 'ml-regression-multivariate-linear'
import { iInputs, iOutputs } from './types/labeled'
import tweets from './data/labeledData.json'
import { writeFile } from 'fs/promises'

const features:(keyof iInputs)[] = [
    'followers', 'following', // Bio
    'isDaytime', 'isWeekDay', // Datetime
    'emojis', 'isReply', // Structure
    'characterLength', 'pargagraphLength', // Length
    'hasHashtags', 'mentions', 'hasMedia', 'hasLinks', // Entities
]

export const labels:(keyof iOutputs)[] = [ 
    'engagements', 'impressions', 'likes', 'retweets', 'replies', 'clicks', 'visits'
]

const x = tweets.map((t) => features.map((f) => t[f] as number))
const y = tweets.map((t) => labels.map((f) => t[f]))

const { weights } = new MLR(x, y)

const regression = labels.reduce((d, k, i) => ({ 
    ...d, 
    [k]: features.reduce((d, _, idx) => ({...d, [features[idx]]: weights[idx][i] }), {}) })
, {})

const regressionData = JSON.stringify(regression)
writeFile('./data/regression.json', regressionData)
