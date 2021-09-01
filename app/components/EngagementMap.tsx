import { CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis } from 'recharts'
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
        <CartesianGrid />

        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
        <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="km" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />

        <Scatter name="A school" data={data} fill="#8884d8" />
    </ScatterChart>
</ResponsiveContainer>



export const EngagementMap = () => <Card title={'Engagement Map'}>
    <BubbleChart />
</Card>
