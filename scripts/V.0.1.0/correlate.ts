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
const getCorrelation = (tweets:iLabeledTweet[], X:feature, Y:label) => sampleCorrelation(
    tweets.map(t => t[X] as number), tweets.map(t => t[Y] as number)
).toFixed(3)

const getOutputCorrelations = (tweets:iLabeledTweet[]):iOutputCorrelations => ({
    likes: correlations,
    replies: correlations,
    retweets: correlations,
    visits: correlations,
    clicks: correlations,
    impressions: correlations
})
