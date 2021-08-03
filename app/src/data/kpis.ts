import { iLastWeek } from '../types/LastWeek'
import { iLastDay } from '../types/LastDay'


const kpis = { tweets:1, likes:3, replies:2, retweets:1, quotes:1, visits:2, clicks:2 }
const follows = [{ url:'', user:'', followers:1000, following:100, audience:'Audience', tweets:10 }]
const topics = [{ topic:'Topic', tweets:1, rate:1.5 }]

const lastDay:iLastDay = {
    engagement: {
        tweets:[{ text:'Sample Tweet', rate:1.5 }],
        topics,
        kpis
    },

    activity: {
        tweets:[{ text:'Sample Tweet', topic:'Topic', kpis }],
        replies:[{ text:'Sample Reply', niche:'Niche', kpis }]
    },

    reach: {
        impressions:1200,
        niches:[{ niche:'Niche', impressions:1200, tweets:1 }],
        follows
    }
}


const days = [
    { rate:0, day:'Monday' }, 
    { rate:0, day:'Tuesday' },
    { rate:0, day:'Wednesday' }, 
    { rate:0, day:'Thursday' },
    { rate:1.5, day:'Friday' }, 
    { rate:0, day:'Saturday' },
    { rate:0, day:'Sunday' }
]

const lastWeek:iLastWeek = {
    engagement:{ days, topics, kpis },
    activity:{
        tweets:[{ topic:'Topic', kpis }],
        replies:[{ niche:'Niche', kpis }]
    },
    reach:{
        impressions:[{ user:'User', link:'', tweets:2, impressions:30, niche:'Niche' }],
        follows:[{ audience:'Audience', newFollowers:4 }]
    }
}

export const kpiData = { 
    lastDay, 
    lastWeek 
}
