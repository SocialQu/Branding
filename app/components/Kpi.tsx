import { Property } from 'csstype'
import { Card } from './Card'


const numberFormatter = (num:number):string => {
    if(num < 1000) return `${num}`
    if(num < 1000*10) return new Intl.NumberFormat().format(num)
    if(num < 1000*100) return `${Math.round(num/100)/10}k`
    if(num < 1000*1000) return `${Math.round(num/1000)}k`
    return `${Math.round(num/100000)/10}M`
}

interface iKpi { label:string, value:number, color?:Property.Color, isPercent?:boolean }
const KpiValue = ({ label, value, color, isPercent }:iKpi) => <div className='level-item level-kpi'>
    <p style={{color:'white', textAlign:'center'}}> 
        <small style={{fontSize: '1rem'}}>{label}</small> <br/>
        <span 
            className="subtitle is-2" 
            style={{color: color || 'white', fontSize:!isPercent ? '2.5rem' : '2.25rem'}}
        > { numberFormatter(value) } </span>
        <small style={{fontSize:'1.5em'}}>{isPercent && '%'}</small>
    </p>
</div>


interface iActivity {tweets:number, replies:number}
const Activity = ({tweets, replies}:iActivity) => <Card title={'Activity'}>
    <nav className='level' style={{marginBottom: 0, padding: 0}}>
        <KpiValue label={'Tweets'} value={tweets} color={'deepskyblue'}/>
        <KpiValue label={'Replies'} value={replies} />
    </nav>
</Card>


interface iReach { impressions:number, followers:number }
const Reach = ({impressions, followers}:iReach) => <Card title={'Reach'}>
    <nav className='level' style={{marginBottom: 0, padding: 0}}>
        <KpiValue label={'Impressions'} value={impressions} color={'goldenrod'}/>
        <KpiValue label={'New Followers'} value={followers}/>
    </nav>
</Card>


export const Kpis = () => <div className={'columns'} style={{ maxWidth:1200, margin:'auto' }}>
    <div className={'column'}>
        <Activity tweets={34} replies={45}/>
    </div>

    <div className={'column'}>
        <Reach impressions={34} followers={45}/>
    </div>
</div>
