// npx ts-node 6.Build

import { iTweetBubbles, iTweetDays, iTweetTopic } from '../types/build'
import { iTweet, iMetrics } from '../pipeline/1.Fetch'

import tweets from '../data/training/reducedTweets.json' 
import user from '../data/training/user.json' 


const getEngagements = (m: iMetrics) => m.likes + m.clicks + m.visits + m.replies + m.retweets

const build = () => {
    const daysDictionary = tweets.reduce((d, i) => {
        const day = new Date(i.datetime).getDate()
        return d[day] ? {...d, [day]:[...d[day], i]} : {...d, [day]:[i]}
    }, {} as {[day:number]:iTweet[]})

    const daysArray = Object.entries(daysDictionary)
    const tweetDays:iTweetDays[] = daysArray.map(([day, tweets]) => ({ day:Number(day), tweets}))


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
