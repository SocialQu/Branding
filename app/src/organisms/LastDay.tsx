import { EngagementRate } from '../charts/EngagementRate'
import { Activity, Reach } from '../molecules/KpiCards'
import { DetailRing } from '../charts/DetailRing'
import { iLastDay } from '../types'


export const LastDay = ({data}: {data: iLastDay}) => <div className='column' style={{textAlign:'center'}} >
    <p className='subtitle is-4' style={{color: 'white'}}> Yesterday's KPIs </p>
    <EngagementRate data={data.engagement.tweets.map(({ text, ...d }) => ({...d, name:text }))}/>
    <Activity tweets={data.activity.tweets.length} replies={data.activity.replies.length}/>
    <Reach impressions={data.reach.impressions} followers={data.reach.follows.length}/>
    <DetailRing 
        data={[
            { name:'Likes', value: data.engagement.kpis.likes},
            { name:'Retweets', value: data.engagement.kpis.retweets},
            { name:'Replies', value: data.engagement.kpis.replies},
            { name:'Profile Visits', value: data.engagement.kpis.visits}
        ]} 
    />
</div>
