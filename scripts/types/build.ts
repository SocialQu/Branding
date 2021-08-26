import { iTweet, iUser } from '../pipeline/1.Fetch'


export interface iTweetDay {
    day: number
    tweets: number
    impressions: number
    engagements: number
    newFollowers: number
}

export interface iTweetBubble {
    tweet: string
    topic: string 
    color: string
    coordinates: { 
        x: number
        y: number
    }
    engagements: number
}

export interface iTweetTopic {
    topic: string
    color: string
    tweets: number
    engagements: number
    impressions: number
    avgEngagements: number
}


export interface iAudience {
    topic: string
    color: string
    avgTweets: number
    avgFollowers: number
    avgFollowing: number
    newFollowers: number
}


export interface iTopTweet {
    id:number
    topics:{
        topic: string
        color: string
        percentage: number
    }[]
}

export interface iLink {
    link:string
    tweets: number
    engagements: number
    impressions: number
    clicks: number
}


interface iCorrelation {
    coefficient: number
    ideal: number
}

export interface iCorrelations {
    link: iCorrelation
    topic: iCorrelation
    frequency: iCorrelation
    lenght: iCorrelation
    emojis: iCorrelation
    position: iCorrelation
    time: iCorrelation
    weekday: iCorrelation
}


export interface iSuggestion {
    topic: string
    isNew: boolean
    tweets: number
    engagements: number
}

export interface iSuggestions {
    positive: iSuggestion[]
    negative: iSuggestion[]
}


export interface iBaseData {
    user: iUser
    tweetBubbles: iTweetBubble[]    
    tweetTopics: iTweetTopic[]
    audiences: iAudience[]
    topTweets: iTopTweet[]
    links: iLink[]    
    correlations: iCorrelations 
    suggestions: iSuggestions
}

export interface iBuildData extends iBaseData { tweetDays: iTweetDay[] }
