export interface iMetrics {
    likes: number
    clicks: number
    visits: number
    replies: number
    retweets: number
    impressions: number
}

export interface iTweet {
    id: number
    text: string
    datetime: string
    metrics: iMetrics
}

export interface iFollower {
    id: number
    name: string
    bio: string
    tweets: number
    followers: number
    following: number
}

export interface iUser {
    id: number
    name: string
    screen_name: string
    followers_count: number
}

export interface iTopic {
    _id: string
    topic: string
    embeddings: number[]
    center: [number, number]
}

export interface iFetchedData {
    user: iUser
    tweets:iTweet[]
    followers: iFollower[]
    topics: iTopic[]
}