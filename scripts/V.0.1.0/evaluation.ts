import MLR from 'ml-regression-multivariate-linear'
import { iInputs, iOutputs } from './types/labeled'
import tweets from './data/labeledData.json'
import { writeFile } from 'fs/promises'


export const labels:(keyof iOutputs)[] = [ 
    'engagements', 'impressions', 'likes', 'retweets', 'replies', 'clicks', 'visits'
]

const features:(keyof iInputs)[] = [
    'followers', 'following', // Bio
    'isDaytime', 'isWeekDay', // Datetime
    'emojis', 'isReply', // Structure
    'characterLength', 'pargagraphLength', // Length
    'hasHashtags', 'mentions', 'hasMedia', 'hasLinks', // Entities
]


const writeRegressionPredictions = () => {
    const X = tweets.map((t) => features.map((f) => t[f] as number))
    const Y = tweets.map((t) => labels.map((f) => t[f]))
    
    const mlr = new MLR(X, Y)
    
    const predictions = X.map((x, i) => mlr.predict(x))

    writeFile('data/predictions_regression.json', JSON.stringify(predictions.map(([x]) => x)))
    return predictions
}


const printPredctions = (predictions:number[][]) => {
    const Y = tweets.map((t) => labels.map((f) => t[f]))

    const linearError = (X:number[][], Y:number[][]) => X.reduce((d, x, i) => d += Math.abs(x[0] - Y[i][0]), 0)
    const quadraticError = (X:number[][], Y:number[][]) => Math.sqrt(X.reduce((d, x, i) => d += (x[0] - Y[i][0])**2, 0))
    
    const logDelta = (x:number, y:number) => Math.abs(Math.log(x+1) - Math.log(Math.max(y, 1)))
    const logError = (X:number[][], Y:number[][]) => X.reduce((d, x, i) => d += logDelta(x[0], Y[i][0]), 0)
    
    
    const linearRegressionError = {
        linear: linearError(Y, predictions)/Y.length,
        quadratic: quadraticError(Y, predictions)/Y.length,
        logarithmic: logError(Y, predictions)/Y.length
    }    

    console.log('Linear Regression Error:', linearRegressionError)
}

const predictions = writeRegressionPredictions()
printPredctions(predictions)
