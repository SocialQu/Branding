import { iData, iKpis, iKpi, iBestTweets, iTopic, iFollowers } from './types/data'
import { iFetchedData } from './types/fetch'


const computeKPIs = () => {}
const selectTweets = () => {}
const contentAnalysis = () => {}
const labelFollowers = () => {}
const sortReplies = () => {}


export const aggregateData = ({ tweets, replies }:iFetchedData):iData => {
    const kpi:iKpi = { trend:0, value:0, color:'007500' }
    const kpis:iKpis = {
        followers:kpi,
        impressions:kpi,
        engagements:kpi,
        clicks:kpi,
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
