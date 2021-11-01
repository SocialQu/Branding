export interface iMetrics {
    likes: number
    clicks: number
    visits: number
    replies: number
    retweets: number
    impressions: number
}

export interface iTweet {
    id: string
    text: string
    datetime: string
    isReply: boolean
    metrics: iMetrics
}

export interface iReply extends iTweet {
    userId: string
    userName: string
}

export interface iFollower {
    id: number
    bio: string
    name: string
    image: string
    handle: string
    tweets: number
    followers: number
    following: number
}

export interface iUser {
    id: number
    name: string
    image: string
    screen_name: string
    followers_count: number
}

export type TextColor = 'black' | 'white'
export interface iTopic {
    _id: string
    topic: string
    color: string
    text: TextColor
    embeddings: number[]
    center: number[]
}

export interface iFetchedData {
    user: iUser
    tweets:iTweet[]
    replies: iReply[]
    followers: iFollower[]
    topics: iTopic[]
}

export interface iMention {
    profile_image_url: string
    name: string
    id: string
    username: string
}
