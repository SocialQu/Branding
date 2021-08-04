import { EngagementRate } from '../charts/EngagementRate'
import { Activity, Reach } from '../molecules/KpiCards'
import { DetailRing } from '../charts/DetailRing'
import { iLastWeek } from '../types'


export const LastWeek = ({data}: {data:iLastWeek}) => <div className='column' style={{textAlign:'center'}} >
    <p className='subtitle is-4' style={{color: 'white'}}> Last Week KPIs </p>
    <EngagementRate 
        data={
            data.engagement.map(({ day, impressions, engagements }) => ({
                name:day,
                Engagement: Math.round(engagements*1000/impressions)/10
            }))
        }
    />
    <Activity tweets={data.activity.tweets.length} replies={data.activity.replies.length}/>
    <Reach impressions={data.reach.impressions} followers={data.reach.follows}/>
    <DetailRing 
        data={[
            { name:'Likes', value: data.detail.kpis.likes},
            { name:'Retweets', value: data.detail.kpis.retweets},
            { name:'Replies', value: data.detail.kpis.replies},
            { name:'Profile Visits', value: data.detail.kpis.visits}
        ]} 
    />
</div>
