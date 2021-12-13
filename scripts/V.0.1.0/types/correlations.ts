import { iMetrics } from './aggregated'


interface iOutputs extends iMetrics {} // Stores the correlation coefficient [-1, 1] for each output.

interface iOutputCorrelations {
    likes: iOutputs
    clicks: iOutputs
    visits: iOutputs 
    replies: iOutputs
    retweets: iOutputs
    impressions: iOutputs
}

