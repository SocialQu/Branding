import { EngagementRate } from '../charts/EngagementRate'
import { Activity, Reach } from '../molecules/KpiCards'
import { DetailRing } from '../charts/DetailRing'


const data = [
    { Engagement:0, name:'Monday' }, 
    { Engagement:0, name:'Tuesday' },
    { Engagement:0, name:'Wednesday' }, 
    { Engagement:0, name:'Thursday' },
    { Engagement:1.5, name:'Friday' }, 
    { Engagement:0, name:'Saturday' },
    { Engagement:0, name:'Sunday' }
]


const detailData = [
    { name:'Likes', value: 10 },
    { name:'Retweets', value: 10 },
    { name:'Replies', value: 10 },
    { name:'Profile Visits', value: 10 }
]

export const LastDay = () => <div className='column' style={{textAlign:'center'}} >
    <p className='subtitle is-4' style={{color: 'white'}}> Yesterday's KPIs </p>
    <EngagementRate data={data}/>
    <Activity tweets={10} replies={5}/>
    <Reach impressions={1200} followers={12}/>
    <DetailRing data={detailData} />
</div>
