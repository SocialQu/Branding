import { iMetrics as iOutputs } from './aggregated'


// Stores the correlation coefficient [-1, 1] for each output in a matrix.
interface iOutputCorrelations {
    likes: iOutputs
    clicks: iOutputs
    visits: iOutputs 
    replies: iOutputs
    retweets: iOutputs
    impressions: iOutputs
}

interface iCorrelations {}
