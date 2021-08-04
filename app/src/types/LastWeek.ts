import { iStats, iMention, iActivity, iDetail } from './LastDay'

interface iDayEngagement extends iStats { day:string, followers:number }
interface iAudience { audience:string, followers:number, following:number }


export interface iLastWeek {
    engagement:iDayEngagement[],
    activity:iActivity,
    reach:{ impressions:number, mentions:iMention[], follows:iAudience[] }
    detail:iDetail
}
