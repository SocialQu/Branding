import { ValueType, NameType } from 'recharts/src/component/DefaultTooltipContent'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis } from 'recharts'
import { Tooltip, ResponsiveContainer } from 'recharts'
import { TooltipProps } from 'recharts'

import { iEngagementLocations } from '../types/data'
import { Card } from './molecules/Card'


const BubbleTooltip = ({ active, payload }:TooltipProps<ValueType, NameType>) => {
    if(active && payload) console.log(payload[0].payload)

    return active && payload?.length ?
        <div style={{backgroundColor:'white', padding:10, color:'#666', maxWidth:360 }}>
            <p className='desc'> 
                <strong>Engagements:</strong> { payload[0].payload.engagements } <br/>
                <strong>Topic:</strong> { payload[0].payload.topic } <br/>
                { payload[0].payload.tweet.split('\n').map((t:string) => <> {t} <br/></>) } 
            </p>
        </div>
    : null
}
    


const margin = { top:20, right:0, bottom:0, left:0 }
interface iBubbleData { x:number, y:number, engagements:number, tweet:string, topic:string }
interface iBubbleChart { data: iBubbleData[] }
const BubbleChart = ({ data }:iBubbleChart) => <ResponsiveContainer width='100%' height={400} >
    <ScatterChart width={400} margin={margin} >
        <XAxis type='number' dataKey='x' tick={false} hide/>
        <YAxis type='number' dataKey='y' tick={false} hide/>
        <ZAxis type='number' dataKey='engagements' range={[10, 1000]}/>

        <Tooltip content={ <BubbleTooltip /> }/>
        <Scatter data={data} fill='#8884d8' />
    </ScatterChart>
</ResponsiveContainer>


interface iEngagementMap { data:iEngagementLocations[] }
export const EngagementMap = ({ data }:iEngagementMap) => <div 
    className={'columns'} 
    style={{maxWidth:1200, margin:'auto'}}
>
    <div className={'column'} style={{margin:'24px auto 48px'}}>
        <Card title={'Engagement Map'} cardStyle={{maxWidth:1060}}>
            <BubbleChart data={data.map(({ location:{ x, y }, ...tweet }) => ({ x, y, ...tweet }))} />
        </Card>
    </div>
</div>
