import { iTweet, iUser } from '../pipeline/1.Fetch'


interface iCorrelation {
    coefficient: number
    ideal: number
}

interface iSuggestion {
    topic: string
    isNew: boolean
    tweets: number
    engagements: number
}

export interface iTweetDays {
    day: number
    tweets: iTweet[]
}

export interface iTweetBubbles {
    tweet: string
    topic: string 
    color?: string
    coordinates: { 
        x: number
        y: number
    }
    engagements: number
}

export interface iTweetTopic {
    topic: string
    color?: string
    tweets: number
    engagements: number
    impressions: number
    avgEngagements: number
}


export interface iAudience {
    topic: string
    color?: string
    avgTweets: number
    avgFollowers: number
    avgFollowing: number
    newFollowers: number
}


interface iTopTweets {
    id:number
    topics:{
        topic: string
        color: string
        percentage: number
    }[]
}

interface iLinks {
    tweets: number
    engagements: number
    impressions: number
    clicks: number
}

interface iCorrelations {
    link: iCorrelation
    frequency: iCorrelation
    lenght: iCorrelation
    emojis: iCorrelation
    position: iCorrelation
    time: iCorrelation
    weekday: iCorrelation
}

interface iSuggestions {
    positive: iSuggestion
    negative: iSuggestion
}



interface iBuildData {
    user: iUser
    tweetDays: iTweetDays
    tweetBubbles: iTweetBubbles[]    
    tweetTopics: iTweetTopic[]
    audiences: iAudience[]
    topTweets: iTopTweets[]
    links: iLinks[]    
    correlations: iCorrelations[]    
    suggestions: iSuggestions
}
