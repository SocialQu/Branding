import { DetailRing } from '../charts/DetailRing'
import { EngagementRate } from '../charts/EngagementRate'

const data = [{Engagement:10, name:'Monday'}, {Engagement:5, name:'Tuesday'}]
const detailData = [
    { name:'Likes', value: 10 },
    { name:'Retweets', value: 10 },
    { name:'Replies', value: 10 },
    { name:'Profile Visits', value: 10 }
]

export const LastDay = () => <>
    <EngagementRate data={data}/>
    <DetailRing data={detailData} />
</>
