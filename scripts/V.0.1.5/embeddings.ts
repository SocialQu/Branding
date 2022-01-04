import tweets from '../V.0.1.0/data/embeddedTweets.json'
import MLR from 'ml-regression-multivariate-linear'
import { writeFile } from 'fs/promises'

const X = (tweets as any[]).map(({ embeddings }) => embeddings)
const Y = (tweets as any[]).map(({ engagements }) => [engagements])

const { weights } = new MLR(X, Y)
writeFile('./data/weights.json', JSON.stringify(weights.map(([w]) => w)))
