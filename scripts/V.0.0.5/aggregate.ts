import { iTweet as iBestTweet, iBestTweets, iReply as iMention } from './types/data'
import { iData, iKpis, iKpi, iTopic, iFollower, iFollowers  } from './types/data'

import { iFetchedData, iTweet, iMetrics, iReply } from './types/fetch'
import { iReducedTweet, iLabeledFollower } from './analysis'
import Mentions from './data/mentions.json'
import { iEmailData } from './types/email'
import { promises as fs } from 'fs'


const filterTweets = ({ tweets }:iAggregateData) => {
    const weekTweets = tweets.filter(({ datetime }) => getDaysDelta(datetime) < 7)
    const lastWeekTweets = tweets.filter(({ datetime:d }) => getDaysDelta(d) > 7 && getDaysDelta(d) < 14)
    return { weekTweets, lastWeekTweets }
}

const filterReplies = ({ replies }:iAggregateData) => {
    const weekReplies = replies.filter(({ datetime }) => getDaysDelta(datetime) < 7)
    const lastWeekReplies = replies.filter(({ datetime:d }) => getDaysDelta(d) > 7 && getDaysDelta(d) < 14)
    return { weekReplies, lastWeekReplies }
}

const daySeconds = 1000*60*60*24
const getDaysDelta = (datetime:string) => (Number(new Date()) - Number(new Date(datetime)))/daySeconds
const filterData = async(data:iAggregateData) => {
    const { weekTweets, lastWeekTweets } = filterTweets(data)
    const { weekReplies, lastWeekReplies } = filterReplies(data)

    const filteredData = { ...data, tweets:weekTweets, replies:weekReplies }
    const lastWeekData = { tweets:lastWeekTweets, replies:lastWeekReplies }

    const { user: { screen_name: screenName } } = data
    const aggregatedFile = `./data/emails/${screenName}.json`
    const aggregated = await fs.readFile(aggregatedFile)
    const aggregatedData = JSON.parse(aggregated.toString()) as iEmailData

    const lastFollowers = aggregatedData.followers
    return { filteredData, lastWeekData, lastFollowers }
}

const sumEngagements = (m:iMetrics) => m.likes + m.retweets + m.replies + m.visits + m.clicks

interface iLastWeekData { tweets:iReducedTweet[], replies:iReply[] }
const computeKPIs = ({ tweets, replies, user }:iAggregateData, lastWeek:iLastWeekData):iKpis => {
    const getImpressions = ({tweets, replies}:{tweets: iTweet[], replies:iTweet[]}):number => [
        ...tweets, ...replies].reduce((d, { metrics }) => d += metrics.impressions
    , 0)
    
    const getEngagements = ({tweets, replies}:{tweets: iTweet[], replies:iTweet[]}):number => [
        ...tweets, ...replies].reduce((d, { metrics }) => d += sumEngagements(metrics)
    , 0)
    
    const getClicks = ({tweets, replies}:{tweets: iTweet[], replies:iTweet[]}):number => [
        ...tweets, ...replies].reduce((d, { metrics }) => d+=metrics.clicks
    , 0)

    const computeKPI = (value:number, lastWeekValue:number|undefined):iKpi => {
        const trend = lastWeekValue ? Math.round(value/lastWeekValue*100) : undefined
        const kpi = { value, trend, color: trend === undefined || trend > 0 ? '007500' : 'A31700' } as iKpi
        return kpi
    }


    const kpis:iKpis = {
        followers: computeKPI(user.followers_count, undefined),
        impressions: computeKPI(getImpressions({tweets, replies}), getImpressions(lastWeek)),
        engagements: computeKPI(getEngagements({tweets, replies}), getImpressions(lastWeek)),
        clicks: computeKPI(getClicks({tweets, replies}), getClicks(lastWeek)),
        tweets: computeKPI(tweets.length, lastWeek.tweets.length),
        replies: computeKPI(replies.length, lastWeek.replies.length)
    }

    return kpis
}


const selectTweets = ({ tweets, user }:iAggregateData):iBestTweets => {
    const { screen_name, image, name } = user
    const sortedTweets = [...tweets].sort(({metrics:{impressions:a}}, {metrics:{impressions:b}}) => a > b ? -1 : 1)
    const topTweets = sortedTweets.filter((_, i) => i < 3)
    const mappedTweets:iBestTweet[] = topTweets.map(({ text, id, datetime, metrics }) => ({ 
        text,
        date:new Date(datetime),
        likes: metrics.likes,
        replies: metrics.replies, 
        retweets: metrics.retweets, 
        profile_visits: metrics.visits, 
        impressions: metrics.impressions,
        link: `https://twitter.com/${screen_name}/status/${id}`
    }))

    const bestTweets:iBestTweets = {
        profile:{ name:screen_name, link:`https://twitter.com/${name}`, image, handle:name },
        tweets:mappedTweets
    }

    return bestTweets
}


const contentAnalysis = ({ tweets }: iAggregateData):iTopic[] => {
    const uniqueTopics = new Set(tweets.map(({ topic }) => topic))
    const topicsDict = [...uniqueTopics].map(topic => ({
        topic,
        tweets: tweets.filter(({ topic:t }) => topic === t)
    }))

    const engagementTopics = topicsDict.map(({ topic, tweets }) => ({
        topic,
        tweets:tweets.length,
        color: tweets[0].color,
        impressions: tweets.reduce((d, { metrics }) => d += metrics.impressions, 0 ),
        engagements: tweets.reduce((d, { metrics }) => d+= sumEngagements(metrics), 0)
    }))

    const sortedTopics = engagementTopics.sort(({ engagements:a }, { engagements:b }) => a > b ? -1 : 1)
    const topTopics = sortedTopics.filter((_, i, l) => i < 5).filter((_, i) => i < 5)

    if(!topTopics.length) return []
    const bottomEngagements = topTopics[topTopics.length - 1].engagements
    const topicEngagements = topTopics[0].engagements - bottomEngagements

    const topics:iTopic[] = topTopics.map(({ topic, tweets, engagements, impressions, color }) => ({
        name:topic,
        text: 'black', 
        color,
        tweets,
        impressions,
        engagements,
        width:Math.round(((engagements - bottomEngagements)/topicEngagements)*50) + 50
    }))

    return topics
}


const labelFollowers = ({ followers }: iAggregateData):iFollowers => {
    const topFollowers = followers.sort(({ followers:a }, { followers:b }) => a > b ? -1 : 1)
    const [ topFollower, follower1, follower2, follower3, follower4 ] = topFollowers
    const { bio, name:screenName, handle, image:profileImage } = topFollower

    const mapFollower = (follower:iLabeledFollower):iFollower => ({
        name: follower.name.substring(0, 20),
        niche: follower.niche,
        image: follower.image,
        link:`https://twitter.com/${follower.name}`,
        color:follower.color,
        textColor:'black',
        followers: follower.followers,
        ratio: Math.round(follower.followers/follower.following*100)/100,
        ratioColor: follower.followers/follower.following > 1 ? '007500' : 'A31700'
    })


    const emailFollowers:iFollowers = {
        topFollower:{ bio, link:`https://twitter.com/${handle}`, name:screenName, image:profileImage },
        followers:[mapFollower(follower1), mapFollower(follower2), mapFollower(follower3), mapFollower(follower4)]
    }

    return emailFollowers
}


const sortReplies = ({ replies }: iAggregateData) => {
    const grouppedReplies = replies.reduce((d, i) => 
        ({...d, [i.userName]: d[i.userName] ? [...d[i.userName], i] : [i] })
    , {} as {[mention:string]:iReply[] })

    const mentions = Object.keys(grouppedReplies).reduce((d, i) => [...d, grouppedReplies[i]], [] as iReply[][])
 
    interface iAggregatedMention { userName:string, impressions:number, engagements:number }
    const aggregatedMentions:iAggregatedMention[] = mentions.map(replies => ({
        userName: replies[0].userName, 
        impressions: replies.reduce((d, { metrics }) => d+= metrics.impressions, 0),
        engagements: replies.reduce((d, { metrics:m }) => d += m.likes + m.retweets + m.replies + m.visits + m.clicks , 0)
    }))

    const sortedReplies = [...aggregatedMentions].sort(({impressions:a}, {impressions:b}) => a > b ? -1 : 1)
    const topReplies = sortedReplies.filter((_, i) => i < 5)
    topReplies.map(({ userName }) => console.log(userName))

    if(!topReplies.length) return []
    const replyBottomImpressions = topReplies[topReplies.length - 1].impressions
    const replyImpressions = topReplies[0].impressions - replyBottomImpressions

    const emailReplies:iMention[] = topReplies.map(({impressions, engagements, ...r}) => ({
        image: Mentions[r.userName as keyof typeof Mentions],
        impressions,
        engagements,
        name: r.userName,
        link: `https://twitter.com/${r.userName}`,
        percent: Math.round(((impressions - replyBottomImpressions)/replyImpressions)*50) + 50
    }))

    return emailReplies
}


export interface iAggregateData extends iFetchedData { tweets:iReducedTweet[], followers:iLabeledFollower[] }
export const aggregateData = async (data:iAggregateData):Promise<iData> => {
    const { filteredData, lastWeekData } = await filterData(data)

    const kpis = computeKPIs(filteredData, lastWeekData)
    const bestTweets = selectTweets(filteredData)
    const topics = contentAnalysis(filteredData)
    const followers = labelFollowers(filteredData)
    const replies = sortReplies(filteredData)

    return { kpis, bestTweets, topics, followers, replies }
}
