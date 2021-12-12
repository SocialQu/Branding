interface iEntities {
    mentions: string[]
    hashtags: string[]
    media: string[] // URLs
    links: string[] // URLs
}

export interface iMetrics {
    likes: number
    clicks: number
    impressions: number
    retweets: number
    replies: number
    visits: number
}

export interface iAggregatedTweet {
    text:string
    datetime:Date
    isReply:boolean
    metrics:iMetrics
    entities:iEntities
}


export interface iAggregatedUser {
    name: string
    followers: number
    following: number
    tweets: iAggregatedTweet[]
}
