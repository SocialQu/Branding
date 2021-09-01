/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'

const GrowthStyle = { 
    maxWidth:460, 
    maxHeight: 750,
    margin: 'auto', 
    marginTop:40,
    border:'2px solid white', 
    height:'calc(100vh - 130px)',
    backgroundColor: 'rgb(48, 48, 48)'
}

const HeadingStyle = { 
    color: 'white', 
    textAlign: 'center' as const,
    borderBottom: '1px solid white',
    backgroundColor: 'rgb(72, 72, 72)'
}


type GrowthTab = 'tweets' | 'impressions' | 'engagements'
interface iTabs { active:GrowthTab, setActive(GrowthTab):void }
const BarTabs = ({ active, setActive }:iTabs) => <p className='panel-tabs' style={{textAlign:'center'}}>
    <a 
        className={`${active === 'impressions' ? 'is-active' : '' }`}
        style={{color:`${active === 'impressions' ? 'orange' : 'white' }`, width:150}} 
        onClick={() => setActive('impressions')}
    > 
        Impressions <span role='img' aria-label='eyes'> 👀 </span>
    </a>

    <a 
        className={`${active === 'engagements' ? 'is-active' : '' }`}
        style={{color:`${active === 'engagements' ? 'orange' : 'white' }`, width:150}} 
        onClick={() => setActive('engagements')}
    > 
        Engagements <span role='img' aria-label='fire'> 🔥 </span>
    </a>

    <a 
        className={`${active === 'tweets' ? 'is-active' : '' }`}
        style={{color:`${active === 'tweets' ? 'orange' : 'white' }`, width:150}} 
        onClick={() => setActive('tweets')}
    > 
        Tweets <span role='img' aria-label='bird'> 🐦 </span>
    </a>
</p>


type Keyword = 'Content' | 'Audience'
const getGradient = (key:Keyword, active:GrowthTab) => {
    if(key === 'Content'){
        if(active === 'impressions') return { top:'#CAC531', bottom:'#F3F9A7' } // Sulphur
        if(active === 'engagements') return { top:'#00b09b', bottom:'#96c93d' } // Ohhappiness
        return { top:'#22c1c3', bottom:'#fdbb2d' } //  Summer
    }

    if(active === 'impressions') return { top:'#00F260', bottom:'#0575E6' } // RainbowBlue
    if(active === 'engagements') return { top:'#e1eec3', bottom:'#f05053' } // VelvetSun
    return { top:'#fc4a1a', bottom:'#f7b733' } // OrangeFun
}

interface iGetPath { x: number, y: number, width: number, height: number }
const path = ({ x, y, width, height }: iGetPath) => `M${x},${y + height} ${x},${y} ${x + width},${y} ${x + width},${y + height}`
const pathN = ({ x, y, width, height }: iGetPath, n: number) => `M${x+5},${y + height} 
    L${x + 5},${y + Math.min(n,y)} 
    C${x + 5},${y} ${x - 5 + width},${y} ${x - 5 + width},${y + Math.min(n,y)} 
    L${x - 5 + width},${y + height}
`
const getPath = (data: iGetPath) => data.height > 10 ? pathN(data, 10) : data.height > 5 ? pathN(data, 5) : path(data)

interface iCurvedBar extends iGetPath { fill: string }
const CurvedBar = ({ fill, x, y, width, height }: iCurvedBar) => <path d={getPath({x, y, width, height})} stroke='none' fill={fill} />

interface iGrowthChart { 
    data:{ name:string, tweets:number, impressions:number, engagements:number}[]
    active: GrowthTab
    keyword: Keyword
}

export const round = (n:string | number) => {
    if(typeof(n) === 'string') return n
    if(n>=1000000) return `${Math.round(n/100000)/10}M`
    if(n>=10000) return `${Math.round(n/1000)}K`
    if(n>=1000) return `${Math.round(n/100)/10}K`
    return n
}

export const GrowthChart = ({ data, active, keyword }: iGrowthChart) => {
    const color = getGradient(keyword, active)

    return <ResponsiveContainer width="100%" height={200}>
        <BarChart
            style={{margin:'auto'}}
            data={data.filter((_, i) => i < 12)}
            margin={{ top: 20, left: 10, right: 10, bottom: 5 }}
        >
            <defs>
                <linearGradient id={`color${keyword}`} x1='0' y1='0' x2='0' y2='100%' spreadMethod='reflect' >
                <stop offset='0' stopColor={color.bottom} />
                <stop offset='1' stopColor={color.top} />
                </linearGradient>
            </defs>

            <Bar 
                dataKey={active} 
                label={{ position: 'top', style:{fill:'white'}, formatter:(n) => round(n)}}
                shape={<CurvedBar width={300} height={600} x={0} y={0} fill={`url(#color${keyword})`}/>} 
            > { data.map((_, i) => <Cell key={`cell-${i}`}  fill={`url(#color${keyword})`}/>) } </Bar>
        </BarChart>
    </ResponsiveContainer>
}


interface iBarsPanel { title:Keyword }
const BarsPanel = ({ title }: iBarsPanel) => {
    const [active, setActive] = useState<GrowthTab>('engagements')

    return <nav className='panel' style={GrowthStyle}>
        <div className='panel-heading' style={HeadingStyle}> 
            { title } 
        </div>

        <GrowthChart active={active} keyword={title} data={[]}/>

        <div>
            <BarTabs active={active} setActive={setActive}/>
        </div>
    </nav>
}

export const Bars = () => <div className={'columns'} style={{ maxWidth:1200, margin:'auto' }}>
    <div className={'column'}>
        <BarsPanel title={'Content'}/>
    </div>

    <div className={'column'}>
        <BarsPanel title={'Audience'}/>
    </div>
</div>
