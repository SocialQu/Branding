import { iKpis } from './LastDay'

interface iMention {
    user:string
    link:string
    niche:string
    tweets:number
    impressions:number
}

export interface iLastWeek {
    engagement:{
        days:{ day:string, engagement:number }[],
        topics:{ topic:string, tweets:number, rate:number }[],
        kpis:iKpis
    },
    activity:{
        tweets:{ topic:string, kpis:iKpis }[],
        replies:{ niche:string, kpis:iKpis }[]
    },
    reach:{
        impressions:number
        mentions:iMention[],
        follows:{ audience:string, newFollowers:number }[]
    }
}
