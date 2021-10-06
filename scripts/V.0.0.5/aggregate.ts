import { iData, iKpis, iKpi, iBestTweets, iTopic, iFollowers } from './types/data'
import { iFetchedData, iTweet } from './types/fetch'


const computeKPIs = () => {}
const selectTweets = () => {}
const contentAnalysis = () => {}
const labelFollowers = () => {}
const sortReplies = () => {}


const getClicks = (tweets: iTweet[], replies:iTweet[]):number => [
    ...tweets, ...replies].reduce((d, { metrics }) => d+=metrics.clicks,0)

export const aggregateData = ({ tweets, replies, user  }:iFetchedData):iData => {
    const kpi:iKpi = { trend:0, value:0, color:'007500' }
    const kpis:iKpis = {
        followers:{ value:user.followers_count, trend:0, color:'007500' },
        impressions:kpi,
        engagements:kpi,
        clicks:{ value:getClicks(tweets, replies), trend:0, color:'007500' },
        tweets: { value:tweets.length, trend:0, color:'007500' },
        replies:{ value:replies.length, trend:0, color:'007500' }
    }

    const bestTweets:iBestTweets = {
        profile:{ name:'', link:'', image:'', handle:'' },
        tweets:[]
    }

    const topics:iTopic[] = []
    const followers:iFollowers = {
        topFollower:{ bio:'', link:'', name:'', image:'' },
        followers:[]        
    }


    return { kpis, bestTweets, topics, followers, replies:[] }
}
