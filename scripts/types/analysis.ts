import { iUser } from '../pipeline/1.Fetch'
import { iTweetBubble } from './build'


interface kpi {
    average:number
    trend:number
}

interface correlation {
    coefficient: number
    ideal: number
}

interface suggestion {
    topic: string
    isNew: boolean
    tweets: number
    engagements: number
}


export interface iAnalysis {
    user: iUser
    kpis: {
        tweets:kpi
        engagements:kpi
        impressions:kpi
        newFollowers:kpi
    }

    bubbles:iTweetBubble[]

    topics: {
        topic: string
        color: string
        tweets: number
        engagements: number
        impressions: number
        avgEngagements: number
    }[]

    audiences: {
        topic: string
        color: string
        avgTweets: number
        avgFollowers: number
        avgFollowing: number
        newFollowers: number
    }[]

    topTweets: {
        id:number
        topics:{
            topic: string
            color: string
            percentage: number
        }[]
    }[]

    links: {
        tweets: number
        engagements: number
        impressions: number
        clicks: number
    }[]

    correlations: {
        link: correlation
        frequency: correlation
        lenght: correlation
        emojis: correlation
        position: correlation
        time: correlation
        weekday: correlation
    }

    suggestions: {
        positive: suggestion
        negative: suggestion
    }
}
