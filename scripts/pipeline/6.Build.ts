// npx ts-node 6.Build

interface iKPI {
    average:number
    trend:number
}

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

interface iRawData {
    user: string
    kpis: {
        tweets: iKPI
        engagements: iKPI
        impressions: iKPI
        newFollowers: iKPI
    }
    
    bubbles: {
        tweet: string
        topic: string 
        color: string
        coordinates: { 
            x: number
            y: number
        }
        engagements: number
    }[]
    
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
        link: iCorrelation
        frequency: iCorrelation
        lenght: iCorrelation
        emojis: iCorrelation
        position: iCorrelation
        time: iCorrelation
        weekday: iCorrelation
    }
    
    suggestions: {
        positive: iSuggestion
        negative: iSuggestion
    }    
}

const build = () => {}
