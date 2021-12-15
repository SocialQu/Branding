import { iLabeledTweet, iOutputs as iCorrelations } from './types/labeled'
import { iOutputCorrelations } from './types/correlations'
import { sampleCorrelation } from 'simple-statistics'


const correlations:iCorrelations = {
    likes:0,
    visits:0,
    clicks:0,
    replies:0,
    retweets:0,
    impressions:0,
    engagements:0
}

type feature = keyof iLabeledTweet
type label = keyof iCorrelations

interface iGetSingleCorrelation { tweets:iLabeledTweet[], X:feature }
interface iGetCorrelation extends iGetSingleCorrelation { Y:label }

const getCorrelation = ({ tweets, X, Y }: iGetCorrelation):number => ~~sampleCorrelation(
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
    visits: correlations,
    clicks: correlations,
    impressions: correlations
})
