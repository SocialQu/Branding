import { iData, iEngagementLocations, iKpis } from '../../app/types/data'
import { iContent, iAudience, iSuggestions } from '../../app/types/data'
import { iFetchedData, iMetrics } from '../types/fetch'

import { analyzeData, iAnalysisData } from './analysis'
import { fetchData } from './fetch'

import { promises as fs } from 'fs'


const getEngagements = (m: iMetrics) => m.likes + m.clicks + m.visits + m.replies + m.retweets
const getKpis = ({ user, tweets }:iFetchedData):iKpis => {
    const engagements = tweets.map(({ metrics }) => getEngagements(metrics))
    const totalEngagements = engagements.reduce((d, i) => d+= i, 0)

    return {
        tweets: Math.round(tweets.length/30*10)/10,
        engagements: Math.round(totalEngagements/30*10)/10,
        impressions: Math.round(tweets.reduce((d, { metrics }) => d+= metrics.impressions, 0)/30*10)/10,
        followers: user.followers_count
    }
}

const getLocations = ({ tweets }:iAnalysisData):iEngagementLocations[] => {
    const locations:iEngagementLocations[] = tweets.map(({ topic, text, location, metrics }) => ({
        topic,
        tweet: text,
        location,
        engagements: getEngagements(metrics)
    })).sort(({ engagements:a }, { engagements:b }) => a > b ? -1 : 1)

    return locations
}


const getTopicsDictionary = ({ tweets }:iAnalysisData) => {
    const uniqueTopics = new Set(tweets.map(({ topic }) => topic))
    const topicsDict = [...uniqueTopics].map(topic => ({
        topic,
        tweets: tweets.filter(({ topic:t }) => topic === t)
    }))

    return topicsDict
}

const getContent = (data:iAnalysisData):iContent[] => {
    const topicsDict = getTopicsDictionary(data)
    const topics = topicsDict.map(({ topic, tweets }) => ({
        topic,
        tweets:tweets.length,
        impressions: tweets.reduce((d, { metrics }) => d+= metrics.impressions, 0),
        engagements: tweets.reduce((d, { metrics }) => d+= getEngagements(metrics), 0)
    })).sort(({ engagements: a }, { engagements: b }) => a > b ? -1 : 1)

    return topics.filter((_, i) => i < 10)
}

const getNiches = ({ followers }:iAnalysisData):iAudience[] => {
    const uniqueAudiences = new Set(followers.map(({ niche }) => niche))
    const audienceDict = [...uniqueAudiences].map(niche => ({
        niche,
        followers: followers.filter(({ niche:n }) => niche === n)
    }))

    const niches = audienceDict.map(({ niche, followers }) => ({ niche, followers: followers.length }))
    const sortedNiches = niches.sort(({ followers:a }, { followers:b }) => a > b ? -1 : 1)
    return sortedNiches.filter((_, i) => i < 10)
}

const getSuggestions = (data:iAnalysisData):iSuggestions => {
    const topicsDict = getTopicsDictionary(data)

    const topics = topicsDict.map(({ topic, tweets }) => ({
        topic,
        tweets:tweets.length,
        words: tweets.reduce((d, { text }) => [...d, ...text.split(' ')], [] as string[]),
        engagements: tweets.reduce((d, { metrics }) => d+= getEngagements(metrics), 0)/tweets.length
    }))
    
    const engagementTopics = topics.map((t) => ({...t, avgEngagement: t.engagements/t.tweets }))
    const sortedTopics = engagementTopics.sort(({ avgEngagement:a }, { avgEngagement:b }) => a > b ? -1 : 1)

    const topTopics = sortedTopics.filter((_, i, l) => i < l.length/2).filter((_, i) => i < 5)
    const bottomTopics = sortedTopics.filter((_, i, l) => l.length/2 < i).filter((_, i, l) => i + 6 > l.length)

    const positiveTopics = topTopics.map(({ topic, avgEngagement }) => ({ topic, avgEngagement })) 
    const negativeTopics = bottomTopics.map(({ topic, avgEngagement }) => ({ topic, avgEngagement })) 

    const positiveList = topTopics.reduce((d, { words }) => [...d, ...words], [] as string[])
    const negativeList = bottomTopics.reduce((d, { words }) => [...d, ...words], [] as string[])

    const uniquePositive = [...new Set(positiveList)]
    const uniqueNegative = [...new Set(negativeList)]

    const positiveWords = uniquePositive.map(text => ({ text, value:positiveList.filter(w => w === text).length }))
    const negativeWords = uniqueNegative.map(text => ({ text, value:negativeList.filter(w => w === text).length }))

    const suggestions = {
        positive: { topics:positiveTopics, words:positiveWords },
        negative: { topics:negativeTopics, words:negativeWords }
    }


    console.log('Positive: ', suggestions.positive)
    console.log('Negative: ', suggestions.negative)

    return suggestions
}


const getData = async():Promise<iData> => {
    const fetchedData = await fetchData()
    const kpis = getKpis(fetchedData)

    const embededData = await analyzeData(fetchedData)
    const engagementMap = getLocations(embededData)
    const content = getContent(embededData)
    const audience = getNiches(embededData)
    const suggestions = getSuggestions(embededData)

    const data = { kpis, content, audience, engagementMap, suggestions }
    console.log(data)
    
    await fs.writeFile('../../app/data/data.json', JSON.stringify(data))
    return data
}


getData().catch(console.log)
