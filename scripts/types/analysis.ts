import { iBaseData } from './build'


interface kpi {
    average:number
    trend:number
}


export interface iAnalysis extends iBaseData {
    kpis: {
        tweets:kpi
        engagements:kpi
        impressions:kpi
        newFollowers:kpi
    }
}
