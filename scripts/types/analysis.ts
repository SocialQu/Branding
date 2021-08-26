import { iBaseData } from './build'


export interface iKpi {
    average:number
    trend:number
}

export interface iKpis {
    tweets: iKpi
    engagements: iKpi
    impressions: iKpi
    newFollowers: iKpi
}


export interface iAnalysis extends iBaseData { kpis: iKpis }
