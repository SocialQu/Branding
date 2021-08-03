export interface iKpis {
    tweets:number
    likes:number
    replies:number
    retweets:number
    quotes:number
    visits:number
    clicks:number
}


interface newFollower {
    user:string
    url:string
    followers:number
    following:number
    tweets:number
    audience:string
}

export interface iLastDay {
    engagement:{
        tweets:{ text:string, rate:number }[]
        topics:{ topic:string, tweets:number, rate:number }[]
        kpis:iKpis
    },
    activity:{
        tweets:{ text:string, topic:string, kpis:iKpis }[]
        replies:{ text:string, niche:string, kpis:iKpis }[]
    },
    reach:{
        impressions:number
        niches:{ niche:string, tweets:number, impressions:number }[]
        follows:newFollower[]
    }
}
