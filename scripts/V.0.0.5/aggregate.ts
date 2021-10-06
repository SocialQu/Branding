import { iFetchedData } from './types/fetch'
import { iData, iKpis, iKpi, iBestTweets } from './types/data'


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

    return { kpis, bestTweets }
}
