import { EngagementRate } from '../charts/EngagementRate'
import { Activity, Reach } from '../molecules/KpiCards'
import { DetailRing } from '../charts/DetailRing'
import { iLastWeek } from '../types'


export const LastWeek = ({data}: {data:iLastWeek}) => <div className='column' style={{textAlign:'center'}} >
    <p className='subtitle is-4' style={{color: 'white'}}> Last Week KPIs </p>
    <EngagementRate data={data.engagement.days.map(({ day, ...d }) => ({...d, name:day }))}/>
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
