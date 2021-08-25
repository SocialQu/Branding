// npx ts-node 6.Build

import { iAudience, iBuildData, iTweetBubbles, iTweetDays, iTweetTopic } from '../types/build'
import { iTopTweet, iLink, iCorrelations } from '../types/build'
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

const getTopTweets = ():iTopTweet[] => {
    const sortedTweets = [...tweets].sort(({metrics:a}, {metrics:b}) => 
        getEngagements(a) > getEngagements(b) ? 1 : -1
    ).filter((_, i) => i < 10)

    const topTweets:iTopTweet[] = sortedTweets.map(({ id, topic }) => ({
        id,
        topics:[ { topic, percentage: 1}]
    }))

    return topTweets
}

const getLinks = ():iLink[] => {
    const tweetsWithLink = tweets.filter(({ link }) => link)
    const uniqueLinks = new Set(tweetsWithLink.map(({ link }) => link))

    const linksDict = [...uniqueLinks].map(link => ({
        link: link,
        tweets: tweets.filter(({ link:l }) => link === l)
    }))

    const links = linksDict.map(({ tweets, link }) => ({ 
        link: link as string,
        tweets: tweets.length,
        clicks: tweets.reduce((d, { metrics }) => d += metrics.clicks, 0),
        impressions: tweets.reduce((d, { metrics }) => d += metrics.impressions, 0),
        engagements: tweets.reduce((d, { metrics }) => d += getEngagements(metrics), 0)
    }))

    return links
}

const getCorrelations = ():iCorrelations => {
    const tempCorrelation = { ideal:0, coefficient: 0}

    return {
        link:tempCorrelation,
        frequency: tempCorrelation,
        lenght: tempCorrelation,
        emojis: tempCorrelation,
        position: tempCorrelation,
        time: tempCorrelation,
        weekday: tempCorrelation
    }
}


const build = ():iBuildData => ({
    user,
    tweetDays:getTweetDays(),
    tweetBubbles:getTweetBubbles(),
    tweetTopics:getTweetTopics(),
    audiences:getAudiences(),
    topTweets:getTopTweets(),
    links: getLinks(),
    correlations:getCorrelations()
})

build()
