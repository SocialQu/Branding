import MLR from 'ml-regression-multivariate-linear'
import { iInputs, iOutputs } from './types/labeled'
import tweets from './data/labeledData.json'


const features:(keyof iInputs)[] = [
    'followers', 'following', // Bio
    'isDaytime', 'isWeekDay', // Datetime
    'emojis', 'isReply', // Structure
    'characterLength', 'pargagraphLength', // Length
    'hasHashtags', 'mentions', 'hasMedia', 'hasLinks', // Entities
]

const labels:(keyof iOutputs)[] = [ 
    'engagements', 'impressions', 'likes', 'retweets', 'replies', 'clicks', 'visits'
]

const x = tweets.map((t) => features.map((f) => t[f] as number))
const y = tweets.map((t) => labels.map((f) => t[f]))

const { weights, stdError, stdErrors, stdErrorMatrix } = new MLR(x, y)
features.map((f, i) => console.log(f, weights[i][0]))
