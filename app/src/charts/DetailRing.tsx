import { PieChart, Pie, Cell } from 'recharts'
import { Card } from '../molecules/Card'
import { CSSProperties } from 'react'


const COLORS = ['#d15637', '#0fd447', 'deepskyblue', '#8884d8']
const Square = ({ color }: { color: string}) => <svg width={20} height={15} style={{marginRight:5}}>
    <rect width={15} height={15} style={{fill: color}}/>
</svg>


interface iRing { data: { name: string, value: number}[] }
const Ring = ({ data }: iRing) => <PieChart width={200} height={200}>
    <Pie data={data} cx={90} cy={90} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value"> 
        { data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />) } 
    </Pie>
</PieChart>


const engagementStyle:CSSProperties = {
    color:'white', 
    display:'inline-table', 
    minWidth:24, 
    textAlign:'right', 
    marginRight:8 
}

const Detail = ({ name, value, idx }:{ name:string, value:number, idx:number}) => <> 
    <Square color={COLORS[idx]}/> 
    <strong style={engagementStyle}> { value } </strong> 
    { name } <br/>
</>

export const DetailRing = ({ data }: iRing) => <Card title="Engagement Detail">
    <nav className="level" style={{marginBottom: 0, padding: 0}}>
        <div className="level-item">
            <Ring data={data}/>
        </div>

        <div className="level-item">
            <p style={{color:'white', textAlign: 'left'}}> 
                { data.map(({ name, value }, idx) => <Detail name={name} value={value} idx={idx} /> )}
            </p>
        </div>
    </nav>
</Card>
