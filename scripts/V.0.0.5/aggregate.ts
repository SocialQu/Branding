import { iData, iKpis, iTweet as iBestTweet, iBestTweets, iTopic, iFollower, iFollowers, iReply } from './types/data'
import { iFetchedData, iTweet, iMetrics, iReply as iFetchedReply } from './types/fetch'
import { iReducedTweet, iLabeledFollower } from './analysis'


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
const getDaysDelta = (datetime:string) => (Number(new Date(datetime)) - Number(new Date()))/daySeconds
const filterData = (data:iAggregateData) => {
    const { weekTweets, lastWeekTweets } = filterTweets(data)
    const { weekReplies, lastWeekReplies } = filterReplies(data)

    const filteredData = {...data, tweets:weekTweets, replies:weekReplies }
    const lastWeekData = { tweets:lastWeekTweets, replies:lastWeekReplies }
    return { filteredData, lastWeekData }
}

interface iLastWeekData { tweets:iReducedTweet[], replies:iFetchedReply[] }
const computeKPIs = ({ tweets, replies, user }:iAggregateData, lastWeek:iLastWeekData):iKpis => {
    const getImpressions = (tweets: iTweet[], replies:iTweet[]):number => [
        ...tweets, ...replies].reduce((d, { metrics }) => d+=metrics.impressions
    , 0)
    
    const getEngagements = (tweets: iTweet[], replies:iTweet[]):number => [
        ...tweets, ...replies].reduce((d, { metrics: { likes, retweets, replies, visits, clicks } }) => 
        d+= likes + retweets + replies + visits + clicks
    , 0)
    
    const getClicks = (tweets: iTweet[], replies:iTweet[]):number => [
        ...tweets, ...replies].reduce((d, { metrics }) => d+=metrics.clicks
    , 0)

    const computeKPI = (value:number, lastWeekValue:number|undefined) => {
        const trend = lastWeekValue ? value/lastWeekValue : undefined
        return { value, trend, color: trend ? '007500' : 'A31700' }
    }


    const kpis:iKpis = {
        followers:{ value:user.followers_count, trend:undefined, color:'007500' },
        impressions:{ value:getImpressions(tweets, replies), trend:0, color:'007500' },
        engagements:{ value:getEngagements(tweets, replies), trend:0, color:'007500' },
        clicks:{ value:getClicks(tweets, replies), trend:0, color:'007500' },
        tweets: { value:tweets.length, trend:tweets.length/lastWeek.tweets.length, color:'007500' },
        replies:{ value:replies.length, trend:replies.length/lastWeek.replies.length, color:'007500' }
    }

    return kpis
}


const selectTweets = ({ tweets, user }:iAggregateData):iBestTweets => {
    const { screen_name, image, name } = user
    const sortedTweets = [...tweets].sort(({metrics:{impressions:a}}, {metrics:{impressions:b}}) => a > b ? 1 : -1)
    const topTweets = sortedTweets.filter((_, i) => i < 3)
    const mappedTweets:iBestTweet[] = topTweets.map(({ text, id, datetime, metrics }) => ({ 
        text,
        date:new Date(datetime),
        likes: metrics.likes,
        replies: metrics.replies, 
        retweets: metrics.retweets, 
        profile_visits: metrics.visits, 
        impressions: metrics.impressions,
        link: `https://twitter.com/${name}/status/${id}`
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

    const countEngagements = (m: iMetrics) => m.likes + m.clicks + m.visits + m.replies + m.retweets
    const engagementTopics = topicsDict.map(({ topic, tweets }) => ({
        topic,
        tweets:tweets.length,
        color: tweets[0].color,
        impressions: tweets.reduce((d, { metrics }) => d += metrics.impressions, 0 ),
        engagements: tweets.reduce((d, { metrics }) => d+= countEngagements(metrics), 0)
    }))

    const sortedTopics = engagementTopics.sort(({ engagements:a }, { engagements:b }) => a > b ? -1 : 1)
    const topTopics = sortedTopics.filter((_, i, l) => i < 5).filter((_, i) => i < 5)
    const bottomImpressions = topTopics[topTopics.length - 1].impressions
    const topicImpressions = topTopics[0].impressions - bottomImpressions
    const topics:iTopic[] = topTopics.map(({ topic, tweets, engagements, impressions, color }) => ({
        name:topic,
        text: 'black', 
        color,
        tweets,
        impressions,
        engagements,
        width:Math.round(((impressions - bottomImpressions)/topicImpressions)*50) + 50
    }))

    return topics
}


const labelFollowers = ({ followers }: iAggregateData):iFollowers => {
    const [ topFollower, follower1, follower2, follower3, follower4 ] = followers
    const { bio, name:screenName, handle, image:profileImage } = topFollower

    const mapFollower = (follower:iLabeledFollower):iFollower => ({
        name: follower.name,
        niche: follower.niche,
        image: follower.image,
        link:`https://twitter.com/${follower.name}`,
        color:follower.color,
        textColor:'black',
        followers: follower.followers,
        ratio: follower.followers/follower.following,
        ratioColor: follower.followers/follower.following > 1 ? '007500' : 'A31700'
    })


    const emailFollowers:iFollowers = {
        topFollower:{ bio, link:`https://twitter.com/${handle}`, name:screenName, image:profileImage },
        followers:[mapFollower(follower1), mapFollower(follower2), mapFollower(follower3), mapFollower(follower4)]
    }

    return emailFollowers
}


const sortReplies = ({ replies }: iAggregateData) => {
    const sortedReplies = [...replies].sort(({metrics:{impressions:a}}, {metrics:{impressions:b}}) => a > b ? 1 : -1)
    const topReplies = sortedReplies.filter((_, i) => i < 5)
    const replyBottomImpressions = topReplies[topReplies.length - 1].metrics.impressions
    const replyImpressions = topReplies[0].metrics.impressions - replyBottomImpressions
    const emailReplies:iReply[] = topReplies.map(({metrics:m, ...r}) => ({
        image: '',
        name: r.userName,
        impressions: m.impressions,
        link: `https://twitter.com/${r.userName}`,
        engagements: m.likes + m.retweets + m.replies + m.visits + m.clicks,
        percent: Math.round(((m.impressions - replyBottomImpressions)/replyImpressions)*50) + 50
    }))

    return emailReplies
}


export interface iAggregateData extends iFetchedData { tweets:iReducedTweet[], followers:iLabeledFollower[] }
export const aggregateData = (data:iAggregateData):iData => {
    const { filteredData, lastWeekData } = filterData(data)

    const kpis = computeKPIs(filteredData, lastWeekData)
    const bestTweets = selectTweets(filteredData)
    const topics = contentAnalysis(filteredData)
    const followers = labelFollowers(filteredData)
    const replies = sortReplies(filteredData)

    return { kpis, bestTweets, topics, followers, replies }
}
