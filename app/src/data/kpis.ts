import { iDayEngagement, iAudience } from '../types/LastWeek'
import { iKpis, iLastDay, iLastWeek } from '../types'


const kpis = { tweets:1, likes:3, replies:2, retweets:1, quotes:1, visits:2, clicks:2 }

const tweets = [{ topic:'Topic', tweets:2, engagements:3, impressions:23 }]
const replies = [{ niche:'Niche', tweets:2, engagements:3, impressions:23 }]
const mentions = [{ user:'User', url:'url', impressions:1200, tweets:1, engagements:3 }]
const follows = [{ url:'', user:'', followers:1000, following:100, audience:'Audience', tweets:10 }]
const detail = { kpis, tweets:[{ text:'Text', kpis}] }
const lastDay:iLastDay = {
    engagement: [{ tweet:'Tweet', topic:'topic', tweets:1, impressions:1200, engagements:3 }],
    activity: { tweets, replies },
    reach: { impressions:2200, mentions, follows },
    detail
}


const days:iDayEngagement[] = [
    { day:'Monday', engagements:0, impressions:3, tweets:3, followers:2 }, 
    { day:'Tuesday', engagements:0, impressions:3, tweets:3, followers:2 },
    { day:'Wednesday', engagements:0, impressions:3, tweets:3, followers:2 }, 
    { day:'Thursday', engagements:0, impressions:3, tweets:3, followers:2 },
    { day:'Friday', engagements:15, impressions:3, tweets:3, followers:2 }, 
    { day:'Saturday', engagements:0, impressions:3, tweets:3, followers:2 },
    { day:'Sunday', engagements:0, impressions:3, tweets:3, followers:2 }
]


const audience:iAudience[] = [{ audience:'Audience', followers:4, following:4, newFollowers:3 }]
const lastWeek:iLastWeek = {
    engagement:days,
    activity:{ tweets, replies },
    reach:{ impressions:17400, mentions, follows:4, audience },
    detail
}

export const kpiData:iKpis = { lastDay, lastWeek }
