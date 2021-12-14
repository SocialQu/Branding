import { iCorrelations, iOutputCorrelations } from './types/correlations'
import { sampleCorrelation } from 'simple-statistics'
import { iLabeledTweet } from './types/labeled'


const correlations:iCorrelations = {
    likes:0,
    visits:0,
    clicks:0,
    replies:0,
    retweets:0,
    impressions:0,
    engagements:0
}


const getCorrelation = (tweets:iLabeledTweet[]) => tweets.map(({ likes }) => likes)

const getOutputCorrelations = (tweets:iLabeledTweet[]):iOutputCorrelations => ({
    likes: correlations,
    replies: correlations,
    retweets: correlations,
    visits: correlations,
    clicks: correlations,
    impressions: correlations
})
