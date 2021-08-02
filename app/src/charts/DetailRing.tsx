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


export const EngagementRing = ({ data }: iRing) => <nav className="level" style={{marginBottom: 0, padding: 0}}>
    <div className="level-item">
        <Ring data={data}/>
    </div>
    <div className="level-item">
        <p style={{color:'white', textAlign: 'left'}}> 
            <Square color={COLORS[0]}/> 
                <strong style={engagementStyle}> { data.find(({ name }) => name === 'Likes')?.value } </strong> 
                Likes <br/>
            <Square color={COLORS[1]}/> 
            <strong style={engagementStyle}> { data.find(({ name }) => name === 'Retweets')?.value } </strong> 
                Retweets <br/>
            <Square color={COLORS[2]}/> 
            <strong style={engagementStyle}> { data.find(({ name }) => name === 'Replies')?.value } </strong> 
                Replies <br/>
            <Square color={COLORS[3]}/> 
            <strong style={engagementStyle}> { data.find(({ name }) => name === 'Visits')?.value } </strong> 
                Profile Visits
        </p>
    </div>
</nav>


export const DetailRing = ({ data }: iRing) => <Card title="Engagement Detail">
    <EngagementRing data={data} />
</Card>
