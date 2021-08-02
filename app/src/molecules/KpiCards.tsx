import { Kpi } from '../atoms/Kpi'
import { Card } from './Card'


interface iActivity {tweets:number, replies:number}
export const Activity = ({tweets, replies}:iActivity) => <Card title={'Activity'}>
    <nav className="level" style={{marginBottom: 0, padding: 0}}>
        <Kpi label={'Tweets'} value={tweets} color={'deepskyblue'}/>
        <Kpi label={'Replies'} value={replies} />
    </nav>
</Card>


interface iReach { impressions:number, followers:number }
export const Reach = ({impressions, followers}:iReach) => <Card title={'Reach'}>
    <nav className="level" style={{marginBottom: 0, padding: 0}}>
        <Kpi label={'Impressions'} value={impressions} color={'goldenrod'}/>
        <Kpi label={'New Followers'} value={followers}/>
    </nav>
</Card>
