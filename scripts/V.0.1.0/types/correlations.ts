import { iOutputs as iCorrelations, iInputs } from './labeled'


// Stores the correlation coefficient [-1, 1] for each output in a matrix.
export interface iOutputCorrelations {
    likes: iCorrelations
    clicks: iCorrelations
    visits: iCorrelations
    replies: iCorrelations
    retweets: iCorrelations
    impressions: iCorrelations
    engagements: iCorrelations
}


export type iInputCorrelations = { [input in keyof iInputs]: iCorrelations }

export interface iAverages extends iCorrelations { tweets:number }
export interface iDatetimeCorrelations {
    days: { day:number, averages:iAverages }[]
    hours: { hour:number, averages:iAverages }[]
}
