export interface iKpis {
    tweets:number
    likes:number
    replies:number
    retweets:number
    quotes:number
    visits:number
    clicks:number
}


export interface iStats { tweets:number, engagements:number, impressions:number }

interface iEngagement extends iStats { tweet:string, topic:string }
interface iTopic extends iStats { topic:string }
interface iNiche extends iStats { niche:string }
export interface iActivity { tweets:iTopic[], replies:iNiche[] }

export interface iMention extends iStats { user:string, url:string }


interface newFollower {
    user:string
    url:string
    followers:number
    following:number
    tweets:number
    audience:string
}

interface iTweet { text:string, kpis:iKpis }
export interface iDetail { kpis:iKpis, tweets:iTweet }

export interface iLastDay {
    engagement: iEngagement[]
    activity: iActivity
    reach:{ impressions:number, mentions:iMention[], follows:newFollower[] }
    detail:iDetail
}
