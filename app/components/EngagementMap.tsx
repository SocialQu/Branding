import { ScatterChart, Scatter, XAxis, YAxis, ZAxis } from 'recharts'
import { Tooltip, ResponsiveContainer } from 'recharts'
import { iEngagementLocations } from '../types/data'
import { Card } from './molecules/Card'


const margin = { top:20, right:0, bottom:0, left:0 }
interface iBubbleData { x:number, y:number, z:number, tweet:string }
interface iBubbleChart { data: iBubbleData[] }
const BubbleChart = ({ data }:iBubbleChart) => <ResponsiveContainer width="100%" height={400} >
    <ScatterChart width={400} margin={margin} >
        <XAxis type="number" dataKey="x" tick={false} hide/>
        <YAxis type="number" dataKey="y" tick={false} hide/>
        <ZAxis type="number" dataKey="z" range={[10, 1000]}/>

        <Tooltip />
        <Scatter data={data} fill="#8884d8" />
    </ScatterChart>
</ResponsiveContainer>


interface iEngagementMap { data:iEngagementLocations[] }
export const EngagementMap = ({ data }:iEngagementMap) => <div 
    className={'columns'} 
    style={{maxWidth:1200, margin:'auto'}}
>
    <div className={'column'} style={{margin:'24px auto 48px'}}>
        <Card title={'Engagement Map'} cardStyle={{maxWidth:1060}}>
            <BubbleChart data={data.map(({ location:{ x, y }, engagements:z, tweet }) => ({ x, y, z, tweet }))} />
        </Card>
    </div>
</div>
