import { LineChart, Line, Tooltip, XAxis } from 'recharts'
import { CSSProperties } from 'react'

import { Card } from '../molecules/Card'
import { Kpi } from '../atoms/Kpi'


const divChartStyle:CSSProperties = { maxWidth:210, minWidth:210, margin:'auto' }

interface iChart { data: { name:string, Engagement:number}[] }
const Chart = ({ data }: iChart) => <div className='level-item' style={divChartStyle}>
    <LineChart width={210} height={50} data={data}>
        <Tooltip formatter={(d:string) => `${d}%`} />
        <XAxis dataKey='text' hide />
        <Line type='monotone' dataKey='Engagement' stroke='#8884d8' strokeWidth={2} dot={false}/>
    </LineChart>
</div>

export const EngagementRate = ({ data }: iChart) => {
    const avg = Math.round((data.reduce((d, { Engagement }) => d+=Engagement, 0)/data.length)*10)/10
    const high = Math.round(Math.max(...data.map(({ Engagement }) => Engagement))*10)/10

    return <Card title='Engagement Rate'>
        <nav className='level'>
            <Chart data={data}/>
            <Kpi label={'Avg'} value={avg || 0} isPercent/>
            <Kpi label={'High'} value={high > 0 ? high : 0} isPercent/>
        </nav>
    </Card>
}
