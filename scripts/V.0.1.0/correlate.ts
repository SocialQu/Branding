import { iCorrelations, iOutputCorrelations } from './types/correlations'
import { iLabeledTweet } from './types/labeled'


const correlations:iCorrelations = {
    likes:0,
    replies:0,
    retweets:0,
    visits:0,
    clicks:0,
    impressions:0,
    engagements:0
}

const getOutputCorrelations = (tweets:iLabeledTweet[]):iOutputCorrelations => ({
    likes: correlations,
    replies: correlations,
    retweets: correlations,
    visits: correlations,
    clicks: correlations,
    impressions: correlations
})
