import { iData, iKpis, iKpi, iBestTweets, iTopic, iReply, iFollowers } from './types/data'
import { iFetchedData } from './types/fetch'


const computeKPIs = () => {}
const selectTweets = () => {}
const contentAnalysis = () => {}
const labelFollowers = () => {}
const sortReplies = () => {}


export const aggregateData = (data:iFetchedData):iData => {
    const kpi:iKpi = { trend:0, value:0, color:'007500' }
    const kpis:iKpis = {
        followers:kpi,
        impressions:kpi,
        engagements:kpi,
        clicks:kpi,
        tweets:kpi,
        replies:kpi
    }

    const bestTweets:iBestTweets = {
        profile:{ name:'', link:'', image:'', handle:'' },
        tweets:[]
    }

    const followers:iFollowers = {
        topFollower:{ bio:'', link:'', name:'', image:'' },
        followers:[]        
    }

    const topics:iTopic[] = []
    const replies:iReply[] = []

    return { kpis, bestTweets, topics, followers, replies }
}
