import { iMetrics as iCorrelations } from './aggregated'


// Stores the correlation coefficient [-1, 1] for each output in a matrix.
interface iOutputCorrelations {
    likes: iCorrelations
    clicks: iCorrelations
    visits: iCorrelations
    replies: iCorrelations
    retweets: iCorrelations
    impressions: iCorrelations
}

interface iInputCorrelations {}
