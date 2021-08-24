// npx ts-node 6.Build

import tweets from '../data/training/reducedTweets.json' 
import { iTweet, iUser, iMetrics } from './1.Fetch'
import user from '../data/training/user.json' 


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

interface iTweetDays {
    day: number
    tweets: iTweet[]
}

interface iTweetBubbles {
    tweet: string
    topic: string 
    color?: string
    coordinates: { 
        x: number
        y: number
    }
    engagements: number
}

interface iTweetTopic {
    topic: string
    color?: string
    tweets: number
    engagements: number
    impressions: number
    avgEngagements: number
}


interface iAudience {
    topic: string
    color: string
    avgTweets: number
    avgFollowers: number
    avgFollowing: number
    newFollowers: number
}


interface iBuildData {
    user: iUser
    tweetDays: iTweetDays
    tweetBubbles: iTweetBubbles[]    
    tweetTopics: iTweetTopic[]
    audiences: iAudience[]
    
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


const getEngagements = (m: iMetrics) => m.likes + m.clicks + m.visits + m.replies + m.retweets

const build = () => {
    const daysDictionary = tweets.reduce((d, i) => {
        const date = new Date(i.datetime).getDate()
        return d[date] ? {...d, [date]:[...d[date], i]} : {...d, [date]:[i]}
    }, {} as {[date:number]:iTweet[]})

    const tweetDays = Object.entries(daysDictionary).map(([day, tweets]) => ({ day, tweets}))
    const tweetBubbles:iTweetBubbles[] = tweets.map(({ text, topic, location, metrics }) => ({
        topic,
        tweet:text,
        engagements: getEngagements(metrics),
        coordinates:{ x: location.x, y: location.y }
    }))

    const uniqueTopics = new Set(tweets.map(({ topic }) => topic))
    const topicsDict = [...uniqueTopics].map(topic => ({
        topic,
        tweets: tweets.filter(({ topic:t }) => topic === t)
    }))

    const tweetTopics:iTweetTopic[] = topicsDict.map(({ topic, tweets }) => ({ 
        topic,
        tweets:tweets.length,
        impressions: tweets.reduce((d, { metrics }) => d+= metrics.impressions, 0),
        engagements: tweets.reduce((d, { metrics }) => d+= getEngagements(metrics), 0)
    })).map(t => ({...t, avgEngagements:t.engagements/t.tweets }))


    const buildData = {
        user,
        tweetDays,
        tweetBubbles,
        tweetTopics
    }

    console.log(buildData)
}

build()
