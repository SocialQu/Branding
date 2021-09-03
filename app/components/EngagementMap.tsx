import { ScatterChart, Scatter, XAxis, YAxis, ZAxis } from 'recharts'
import { Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from './molecules/Card'


const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
]

const margin = { top:20, right:0, bottom:0, left:0 }
const BubbleChart = () => <ResponsiveContainer width="100%" height={400} >
    <ScatterChart width={400} margin={margin} >
        <XAxis type="number" dataKey="x" tick={false} hide/>
        <YAxis type="number" dataKey="y" tick={false} hide/>
        <ZAxis type="number" dataKey="z" range={[60, 400]}/>

        <Tooltip/>
        <Scatter data={data} fill="#8884d8" />
    </ScatterChart>
</ResponsiveContainer>



export const EngagementMap = () => <div className={'columns'} style={{maxWidth:1200, margin:'auto'}}>
    <div className={'column'} style={{margin:'24px auto 48px'}}>
        <Card title={'Engagement Map'} cardStyle={{maxWidth:1060}}>
            <BubbleChart />
        </Card>
    </div>
</div>
