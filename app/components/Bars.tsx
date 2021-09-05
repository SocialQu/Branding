/* eslint-disable jsx-a11y/anchor-is-valid */
import { ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { iAudience, iContent } from '../types/data'
import { CSSProperties, useState } from 'react'
import { Panel } from './molecules/Panel'


const GrowthChartStyle:CSSProperties = {
    color: 'white', 
    display: 'block', 
    padding:'12px 0px 1px 0px', 
    backgroundColor: 'rgb(16, 16, 16)'
}

type GrowthTab = 'tweets' | 'impressions' | 'engagements' | 'followers'
interface iContentTabs { active:GrowthTab, setActive(tab:GrowthTab):void }
const ContentTabs = ({ active, setActive }:iContentTabs) => <p 
    className='panel-tabs' 
    style={{textAlign:'center'}}
>
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
    const sulphur = { top:'#CAC531', bottom:'#F3F9A7' }
    const ohhappiness = { top:'#00b09b', bottom:'#96c93d' }
    const summer = { top:'#22c1c3', bottom:'#fdbb2d' }
    const rainbowBlue = { top:'#e1eec3', bottom:'#f05053' }
    

    if(key === 'Content'){
        if(active === 'impressions') return  sulphur
        if(active === 'engagements') return  ohhappiness
        return  summer
    }

    return rainbowBlue
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



const round = (n:string | number) => {
    if(typeof(n) === 'string') return n
    if(n>=1000000) return `${Math.round(n/100000)/10}M`
    if(n>=10000) return `${Math.round(n/1000)}K`
    if(n>=1000) return `${Math.round(n/100)/10}K`
    return n
}


interface iBarData { name:string, tweets?:number, impressions?:number, engagements?:number, followers?:number }
interface iGrowthChart { data:iBarData[], active: GrowthTab, keyword: Keyword }
export const GrowthChart = ({ data, active, keyword }: iGrowthChart) => {
    const color = getGradient(keyword, active)

    return <ResponsiveContainer width='100%' height={200}>
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
                label={{ position: 'top', style:{fill:'white'}, formatter:(n:number) => round(n)}}
                shape={<CurvedBar width={300} height={600} x={0} y={0} fill={`url(#color${keyword})`}/>} 
            > { data.map((_, i) => <Cell key={`cell-${i}`}  fill={`url(#color${keyword})`}/>) } </Bar>
        </BarChart>
    </ResponsiveContainer>
}


const NameStyle:CSSProperties = {color:'deepskyblue', paddingLeft:6, marginRight:'auto'}
const ItemStyle:CSSProperties = { color: 'white', display: 'block', backgroundColor: 'rgb(48, 48, 48)' }
interface iContentItem extends iBarData { impressions:number, engagements:number, tweets:number }
const ContentItem = ({ name, impressions, engagements, tweets }:iContentItem) => <div 
    className='panel-block' 
    style={ItemStyle}
>
    <nav className='level' style={{marginTop:3, marginBottom:6}}>
        <div className='level-item div-keyword' style={{width:'50%'}}>
            <a className='subtitle is-5 keyword' style={NameStyle}> { name } </a>
        </div>

        <div className='level-item has-text-centered level-icon'>
            <div>
                <p className='subtitle is-5' style={{color:'white'}}> 
                    { round(impressions) } <span role='img' aria-label='eyes'> 👀 </span>
                </p>
            </div>
        </div>

        <div className='level-item has-text-centered level-icon'>
            <div>
                <p className='subtitle is-5' style={{color:'white'}}> 
                    { round(engagements) } <span role='img' aria-label='fire'> 🔥 </span>
                </p>
            </div>
        </div>

        <div className='level-item has-text-centered level-icon'>
            <div>
                <p className='subtitle is-5' style={{color:'white'}}> 
                    { round(tweets) } <span role='img' aria-label='bird'> 🐦 </span>
                </p>
            </div>
        </div>
    </nav>
</div>


interface iContentPanel { data:iContentItem[] }
const ContentPanel = ({ data }:iContentPanel) => {
    const [active, setActive] = useState<GrowthTab>('engagements')

    return <Panel title='Content Topics'>
            <ContentTabs active={active} setActive={setActive}/>

            <div className='panel-block' style={GrowthChartStyle}>
                <GrowthChart active={active} keyword={'Content'} data={data}/>
            </div>

            <> { data.map((d, i) => <ContentItem {...d} key={i}/>) } </>
    </Panel>
}


const AudienceTabs = () => <p className='panel-tabs' style={{textAlign:'center'}}>
    <a style={{color:'white', width:'50%'}}> 
        Niche <span role='img' aria-label='eyes'> ❤️ </span>
    </a>

    <a style={{color:'white', width:'50%'}}> 
        Followers <span role='img' aria-label='eyes'> 👣 </span>
    </a>
</p>


interface iAudienceItem extends iBarData { followers:number }
const AudienceItem = ({ name, followers }:iAudienceItem) => <div 
    className='panel-block' 
    style={ItemStyle}
>
    <nav className='level' style={{marginTop:3, marginBottom:6}}>
        <div className='level-item div-keyword' style={{width:'50%'}}>
            <a className='subtitle is-5 keyword' style={NameStyle}> { name } </a>
        </div>

        <div className='level-item has-text-centered level-icon'>
            <div>
                <p className='subtitle is-5' style={{color:'white'}}> 
                    { round(followers) } <span role='img' aria-label='eyes'> 👣 </span>
                </p>
            </div>
        </div>
    </nav>
</div>


interface iAudiencePanel { data:iAudienceItem[] }
const AudiencePanel = ({ data }:iAudiencePanel) => <Panel title='Audience Composition'>
    <AudienceTabs />

    <div className='panel-block' style={GrowthChartStyle}>
        <GrowthChart active={'followers'} keyword={'Followers'} data={data}/>
    </div>

    <> { data.map((d, i) => <AudienceItem {...d} key={i}/>) } </>
</Panel>


interface iBars { content:iContent[], audience:iAudience[] }
export const Bars = ({ content, audience }:iBars) => <div 
    className={'columns'} 
    style={{ maxWidth:1200, margin:'auto' }}
>
    <ContentPanel data={content.map((c) => ({...c, name:c.topic }))}/>
    <AudiencePanel data={audience.map((c) => ({...c, name:c.niche }))}/>
</div>
