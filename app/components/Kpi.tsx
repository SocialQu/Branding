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


export const Kpis = () => <div className={'columns'} style={{ maxWidth:1200, margin:'auto' }}>
    <div className={'column'}>
        <Card title={'30-Day KPIs'} cardStyle={{maxWidth:1060}}>
            <nav className='level' style={{marginBottom: 0, padding: 0}}>
                <KpiValue label={'Tweets'} value={12} color={'deepskyblue'}/>
                <KpiValue label={'Engagements'} value={23} color={'indianred'}/>
                <KpiValue label={'Impressions'} value={34} color={'goldenrod'}/>
                <KpiValue label={'Followers'} value={54} color={'mediumseagreen'}/>
            </nav>
        </Card>    
    </div>
</div>
