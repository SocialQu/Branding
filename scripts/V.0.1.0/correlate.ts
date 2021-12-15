import { iLabeledTweet, iOutputs as iCorrelations } from './types/labeled'
import { iOutputCorrelations } from './types/correlations'
import { sampleCorrelation } from 'simple-statistics'
import tweets from './data/labeledData.json'
import { writeFile } from 'fs/promises'


type feature = keyof iLabeledTweet
type label = keyof iCorrelations

interface iGetSingleCorrelation { tweets:iLabeledTweet[], X:feature }
interface iGetCorrelation extends iGetSingleCorrelation { Y:label }

const getCorrelation = ({ tweets, X, Y }: iGetCorrelation):number => +sampleCorrelation(
    tweets.map(t => t[X] as number), tweets.map(t => t[Y] as number)
).toFixed(3)

const getSingleCorrelation = ({ tweets, X }:iGetSingleCorrelation):iCorrelations => ({
    likes: getCorrelation({ tweets, X, Y:'likes' }),
    visits: getCorrelation({ tweets, X, Y:'visits' }),
    clicks: getCorrelation({ tweets, X, Y:'clicks' }),
    replies: getCorrelation({ tweets, X, Y:'replies' }),
    retweets: getCorrelation({ tweets, X, Y:'retweets' }),
    impressions: getCorrelation({ tweets, X, Y:'impressions' }),
    engagements: getCorrelation({ tweets, X, Y:'engagements' })
})

const getOutputCorrelations = (tweets:iLabeledTweet[]):iOutputCorrelations => ({
    likes: getSingleCorrelation({ tweets, X:'likes' }),
    replies: getSingleCorrelation({ tweets, X:'replies' }),
    retweets: getSingleCorrelation({ tweets, X:'retweets' }),
    visits: getSingleCorrelation({ tweets, X:'visits' }),
    clicks: getSingleCorrelation({ tweets, X:'clicks' }),
    impressions: getSingleCorrelation({ tweets, X:'impressions' }),
    engagements: getSingleCorrelation({ tweets, X:'engagements' }),
})


const getCorrelations = async(tweets:iLabeledTweet[]) => {
    const outputsCorrelationMatrix = getOutputCorrelations(tweets)
    const outputsMatrixData = JSON.stringify(outputsCorrelationMatrix)
    await writeFile('./data/correlations/outputsMartix.json', outputsMatrixData)

    console.log(outputsCorrelationMatrix)    
}


getCorrelations(tweets as iLabeledTweet[])
