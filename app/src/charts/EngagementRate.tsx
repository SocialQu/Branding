import { LineChart, Line, Tooltip, XAxis } from 'recharts'
import { Card } from '../molecules/Card'
import { CSSProperties } from 'react'


const divChartStyle:CSSProperties = { maxWidth:210, minWidth:210, margin:'auto' }

interface iChart { data: { name:string, Engagement:number}[] }
const Chart = ({ data }: iChart) => <div className='level-item' style={divChartStyle}>
    <LineChart width={210} height={50} data={data}>
        <Tooltip formatter={(d:string) => `${d}%`} />
        <XAxis dataKey='text' hide />
        <Line type='monotone' dataKey='Engagement' stroke='#8884d8' strokeWidth={2} dot={false}/>
    </LineChart>
</div>

const Average = ({ avg }:{avg:number}) => <div className='level-item level-engagement'>
    <p className='subtitle is-3' style={{color: 'white', marginBottom: 20}}> 
        <small style={{fontSize: '1rem'}}>Avg</small><br/>
        {  avg ? <>{ avg }<small>%</small></> : '' }
    </p>
</div>

const High = ({high}:{high:number}) => <div className='level-item level-engagement'>
    <p className='subtitle is-3' style={{color: 'white', marginBottom: 20}}> 
        <small style={{fontSize: '1rem'}}>High</small> <br/>
        {  high > 0 ? <>{ high }<small>%</small></> : '' }
    </p>
</div>


export const EngagementRate = ({ data }: iChart) => {
    const avg = Math.round((data.reduce((d, { Engagement }) => d+=Engagement, 0)/data.length)*10)/10
    const high = Math.round(Math.max(...data.map(({ Engagement }) => Engagement))*10)/10

    return <Card title='Engagement Rate'>
        <nav className='level'>
            <Chart data={data}/>
            <Average avg={avg} />
            <High high={high} />
        </nav>
    </Card>
}
