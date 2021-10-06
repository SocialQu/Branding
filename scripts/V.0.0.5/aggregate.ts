import { iData, iKpis, iKpi, iTweet as iBestTweet, iBestTweets, iTopic, iFollowers, iReply } from './types/data'
import { iFetchedData, iTweet } from './types/fetch'


const computeKPIs = () => {}
const selectTweets = () => {}
const contentAnalysis = () => {}
const labelFollowers = () => {}
const sortReplies = () => {}


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


export const aggregateData = ({ tweets, replies, user  }:iFetchedData):iData => {
    const kpi:iKpi = { trend:0, value:0, color:'007500' }
    const kpis:iKpis = {
        followers:{ value:user.followers_count, trend:0, color:'007500' },
        impressions:{ value:getImpressions(tweets, replies), trend:0, color:'007500' },
        engagements:{ value:getEngagements(tweets, replies), trend:0, color:'007500' },
        clicks:{ value:getClicks(tweets, replies), trend:0, color:'007500' },
        tweets: { value:tweets.length, trend:0, color:'007500' },
        replies:{ value:replies.length, trend:0, color:'007500' }
    }

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

    const topics:iTopic[] = []
    const followers:iFollowers = {
        topFollower:{ bio:'', link:'', name:'', image:'' },
        followers:[]        
    }


    const sortedReplies = [...replies].sort(({metrics:{impressions:a}}, {metrics:{impressions:b}}) => a > b ? 1 : -1)
    const topReplies = sortedReplies.filter((_, i) => i < 5)
    const bottomImpressions = topReplies[topReplies.length - 1].metrics.impressions
    const replyImpressions = topReplies[0].metrics.impressions - bottomImpressions
    const emailReplies:iReply[] = topReplies.map(({metrics:m, ...r}) => ({
        image: '',
        name: r.userName,
        impressions: m.impressions,
        link: `https://twitter.com/${r.userId}`,
        engagements: m.likes + m.retweets + m.replies + m.visits + m.clicks,
        percent: Math.round(((m.impressions - bottomImpressions)/replyImpressions)*50) + 50
    }))


    return { kpis, bestTweets, topics, followers, replies:emailReplies }
}
