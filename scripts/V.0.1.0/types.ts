interface iEntities {
    mentions: string[]
    hashtags: string[]
    media: string[] // URLs
    links: string[] // URLs
}

interface iMetrics {
    likes: number
    clicks: number
    impressions: number
    retweets: number
    replies: number
    visits: number
}

interface iAggregatedTweet {
    text:string
    datetime:Date
    metrics:iMetrics
    entities:iEntities
}
