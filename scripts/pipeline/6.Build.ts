// npx ts-node 6.Build

import tweets from '../data/training/reducedTweets.json' 
import user from '../data/training/user.json' 
import { iTweet, iUser } from './1.Fetch'

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

interface iBuildData {
    user: iUser
    tweetDays: {
        day: number
        tweets: iTweet[]
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


const build = () => {
    const daysDictionary = tweets.reduce((d, i) => {
        const date = new Date(i.datetime).getDate()
        return d[date] ? {...d, [date]:[...d[date], i]} : {...d, [date]:[i]}
    }, {} as {[date:number]:iTweet[]})

    const tweetDays = Object.entries(daysDictionary).map(([day, tweets]) => ({ day, tweets}))

    const buildData = {
        user,
        tweetDays
    }

    console.log(buildData)
}

build()
