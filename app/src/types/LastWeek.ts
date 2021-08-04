import { iStats, iMention, iActivity, iDetail } from './LastDay'

export interface iDayEngagement extends iStats { day:string, followers:number }

export interface iAudience { 
    audience:string
    followers:number
    following:number
    newFollowers:number 
}


export interface iLastWeek {
    engagement:iDayEngagement[],
    activity:iActivity,
    reach:{ impressions:number, mentions:iMention[], follows:number, audience:iAudience[] }
    detail:iDetail
}
