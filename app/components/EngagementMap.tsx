import { ScatterChart, Scatter, XAxis, YAxis, ZAxis } from 'recharts'
import { Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from './Card'


const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const margin = { top:20, right:20, bottom:20, left:20 }
const BubbleChart = () => <ResponsiveContainer width="100%" height={400} >
    <ScatterChart width={400} margin={margin} >
        <XAxis type="number" dataKey="x" />
        <YAxis type="number" dataKey="y" />
        <ZAxis type="number" dataKey="z" range={[60, 400]}/>

        <Tooltip/>
        <Scatter name="A school" data={data} fill="#8884d8" />
    </ScatterChart>
</ResponsiveContainer>



export const EngagementMap = () => <div className={'columns'} style={{maxWidth:1200, margin:'40px auto 0px'}}>
    <div className={'column'}>
        <Card title={'Engagement Map'} cardStyle={{maxWidth:1060}}>
            <BubbleChart />
        </Card>
    </div>
</div>
