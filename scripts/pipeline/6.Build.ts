// npx ts-node 6.Build

import { iAudience, iTweetBubbles, iTweetDays, iTweetTopic } from '../types/build'
import { iTweet, iMetrics } from '../pipeline/1.Fetch'

import followers from '../data/training/labeledFollowers.json' 
import tweets from '../data/training/reducedTweets.json' 
import user from '../data/training/user.json' 


const getEngagements = (m: iMetrics) => m.likes + m.clicks + m.visits + m.replies + m.retweets

const getTweetDays = ():iTweetDays[] => {
    const daysDictionary = tweets.reduce((d, i) => {
        const day = new Date(i.datetime).getDate()
        return d[day] ? {...d, [day]:[...d[day], i]} : {...d, [day]:[i]}
    }, {} as {[day:number]:iTweet[]})

    const daysArray = Object.entries(daysDictionary)
    const tweetDays = daysArray.map(([day, tweets]) => ({ day:Number(day), tweets}))
    return tweetDays
}

const getTweetBubbles = ():iTweetBubbles[] => tweets.map(({ text, topic, location, metrics }) => ({
    topic,
    tweet:text,
    engagements: getEngagements(metrics),
    coordinates:{ x: location.x, y: location.y }
}))

const getTweetTopics = ():iTweetTopic[] => {
    const uniqueTopics = new Set(tweets.map(({ topic }) => topic))
    const topicsDict = [...uniqueTopics].map(topic => ({
        topic,
        tweets: tweets.filter(({ topic:t }) => topic === t)
    }))

    const tweetTopics = topicsDict.map(({ topic, tweets }) => ({ 
        topic,
        tweets:tweets.length,
        impressions: tweets.reduce((d, { metrics }) => d+= metrics.impressions, 0)/tweets.length,
        engagements: tweets.reduce((d, { metrics }) => d+= getEngagements(metrics), 0)/tweets.length
    })).map(t => ({...t, avgEngagements:t.engagements/t.tweets }))

    return tweetTopics    
}

const getAudiences = ():iAudience[] => {
    const uniqueAudiences = new Set(followers.map(({ topic }) => topic))
    const audienceDict = [...uniqueAudiences].map(topic => ({
        topic,
        followers: followers.filter(({ topic:t }) => topic === t)
    }))

    const audiences = audienceDict.map(({ topic, followers }) => ({
        topic,
        newFollowers: followers.length,
        avgTweets: followers.reduce((d, { tweets }) => d+=tweets, 0)/followers.length,
        avgFollowers: followers.reduce((d, { followers }) => d+=followers, 0)/followers.length,
        avgFollowing: followers.reduce((d, { following }) => d+=following, 0)/followers.length
    }))

    return audiences
}


const build = () => {
    const buildData = {
        user,
        tweetDays:getTweetDays(),
        tweetBubbles:getTweetBubbles(),
        tweetTopics:getTweetTopics(),
        audiences:getAudiences()
    }

    console.log(buildData)
}


build()
