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

const X = tweets.map((t) => features.map((f) => t[f] as number))
const Y = tweets.map((t) => labels.map((f) => t[f]))

const mlr = new MLR(X, Y)

const predictions = X.map((x, i) => mlr.predict(x))


const linearError = (X:number[][], Y:number[][]) => X.reduce((d, x, i) => d += Math.abs(x[0] - Y[i][0]), 0)
const quadraticError = (X:number[][], Y:number[][]) => Math.sqrt(X.reduce((d, x, i) => d += (x[0] - Y[i][0])**2, 0))

const logDelta = (x:number, y:number) => Math.abs(Math.log(x+1) - Math.log(y+1))
const logError = (X:number[][], Y:number[][]) => X.reduce((d, x, i) => d += logDelta(x[0], Y[i][0]), 0)
