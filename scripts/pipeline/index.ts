import { iData, iEngagementLocations, iKpis } from '../types/data'
import { iFetchedData, iMetrics } from '../types/fetch'
import { analyzeData, iAnalysisData } from './analysis'
import { fetchData } from './fetch'


const getEngagements = (m: iMetrics) => m.likes + m.clicks + m.visits + m.replies + m.retweets
const getKpis = ({ user, tweets }:iFetchedData):iKpis => {
    const engagements = tweets.map(({ metrics }) => getEngagements(metrics))
    const totalEngagements = engagements.reduce((d, i) => d+= i, 0)

    return {
        tweets: tweets.length,
        engagements: totalEngagements,
        impressions: tweets.reduce((d, { metrics }) => d+= metrics.impressions, 0),
        followers: user.followers_count
    }
}

const getLocations = ({ tweets }:iAnalysisData):iEngagementLocations[] => {
    const locations:iEngagementLocations[] = tweets.map(({ topic, text, location, metrics }) => ({
        topic,
        tweet: text,
        location,
        engagements: getEngagements(metrics)
    }))

    return locations
}

const getData = async():Promise<iData> => {
    const { user, tweets, followers, topics } = await fetchData()
    const kpis = getKpis({ user, tweets, followers, topics })

    const embededData = await analyzeData({ tweets, followers, topics })
    const engagementMap = await getLocations(embededData)

    
    return { kpis, engagementMap }
}
