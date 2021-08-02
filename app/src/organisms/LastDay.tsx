import { EngagementRate } from '../charts/EngagementRate'
import { Activity, Reach } from '../molecules/KpiCards'
import { DetailRing } from '../charts/DetailRing'


const data = [{Engagement:10, name:'Monday'}, {Engagement:5, name:'Tuesday'}]
const detailData = [
    { name:'Likes', value: 10 },
    { name:'Retweets', value: 10 },
    { name:'Replies', value: 10 },
    { name:'Profile Visits', value: 10 }
]

export const LastDay = () => <>
    <EngagementRate data={data}/>
    <Activity tweets={10} replies={5}/>
    <Reach impressions={1200} followers={12}/>
    <DetailRing data={detailData} />
</>
