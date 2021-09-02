/* eslint-disable jsx-a11y/anchor-is-valid */
import { CSSProperties, useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'

const GrowthStyle:CSSProperties = { 
    maxWidth:460, 
    margin: 'auto', 
    border:'2px solid white', 
    backgroundColor: 'rgb(48, 48, 48)'
}

const HeadingStyle:CSSProperties = { 
    color: 'white', 
    textAlign: 'center' as const,
    borderBottom: '1px solid white',
    backgroundColor: 'rgb(72, 72, 72)'
}

const GrowthChartStyle:CSSProperties = {
    color: 'white', 
    display: 'block', 
    padding:'12px 0px 1px 0px', 
    backgroundColor: 'rgb(16, 16, 16)'
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


type Keyword = 'Content' | 'Followers'
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


interface iData { name:string, tweets:number, impressions:number, engagements:number}
interface iGrowthChart { 
    data:iData[]
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


const data:iData[] = [
    {name:'Topic 1', engagements:13, impressions:231, tweets:2 },
    {name:'Topic 2', engagements:9, impressions:223, tweets:2 },
    {name:'Topic 3', engagements:8, impressions:213, tweets:2 },
    {name:'Topic 4', engagements:7, impressions:163, tweets:2 },
    {name:'Topic 5', engagements:6, impressions:133, tweets:2 },
    {name:'Topic 6', engagements:5, impressions:123, tweets:2 },
    {name:'Topic 7', engagements:4, impressions:23, tweets:2 },
    {name:'Topic 8', engagements:3, impressions:133, tweets:2 },
    {name:'Topic 9', engagements:2, impressions:123, tweets:2 },
    {name:'Topic 10', engagements:1, impressions:23, tweets:2 },
]

const NameStyle:CSSProperties = {color:'deepskyblue', paddingLeft:6, marginRight:'auto'}
const ItemStyle:CSSProperties = { color: 'white', display: 'block', backgroundColor: 'rgb(48, 48, 48)' }
const BarItem = ({ name, impressions, engagements, tweets }:iData) => <div className='panel-block' style={ItemStyle}>
    <nav className='level' style={{marginTop:3, marginBottom:6}}>
        <div className='level-item div-keyword' style={{width:'50%'}}>
            <a className='subtitle is-5 keyword' style={NameStyle}> { name } </a>
        </div>

        <div className='level-item has-text-centered level-icon'>
            <div>
                <p className='subtitle is-5' style={{color:'white'}}> 
                    { impressions } <span role='img' aria-label='eyes'> 👀 </span>
                </p>
            </div>
        </div>

        <div className='level-item has-text-centered level-icon'>
            <div>
                <p className='subtitle is-5' style={{color:'white'}}> 
                    { engagements } <span role='img' aria-label='fire'> 🔥 </span>
                </p>
            </div>
        </div>

        <div className='level-item has-text-centered level-icon'>
            <div>
                <p className='subtitle is-5' style={{color:'white'}}> 
                    { tweets } <span role='img' aria-label='bird'> 🐦 </span>
                </p>
            </div>
        </div>
    </nav>
</div>



interface iBarsPanel { title:Keyword }
const BarsPanel = ({ title }: iBarsPanel) => {
    const [active, setActive] = useState<GrowthTab>('engagements')

    return <nav className='panel' style={GrowthStyle}>
        <div className='panel-heading' style={HeadingStyle}> 
            { title === 'Content' ? 'Content Topics' : 'Audience Composition' } 
        </div>

        <BarTabs active={active} setActive={setActive}/>
        <div className='panel-block' style={GrowthChartStyle}>
            <GrowthChart active={active} keyword={title} data={data}/>
        </div>

        { data.map((d) => <BarItem {...d}/>) }
    </nav>
}

export const Bars = () => <div className={'columns'} style={{ maxWidth:1200, margin:'auto' }}>
    <div className={'column'} style={{margin:'24px auto 48px'}}>
        <BarsPanel title={'Content'}/>
    </div>

    <div className={'column'}  style={{margin:'24px auto 48px'}}>
        <BarsPanel title={'Followers'}/>
    </div>
</div>
