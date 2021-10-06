import { iData, iKpis, iKpi, iBestTweets, iTopic, iFollowers } from './types/data'
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
    const bestTweets:iBestTweets = {
        profile:{ name:screen_name, link:`https://twitter.com/${name}`, image, handle:name },
        tweets:[]
    }

    const topics:iTopic[] = []
    const followers:iFollowers = {
        topFollower:{ bio:'', link:'', name:'', image:'' },
        followers:[]        
    }


    return { kpis, bestTweets, topics, followers, replies:[] }
}
