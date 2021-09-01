/* eslint-disable jsx-a11y/anchor-is-valid */

const GROWTH_STYLE = { 
    maxWidth:460, 
    maxHeight: 750,
    margin: 'auto', 
    marginTop:40,
    border:'2px solid white', 
    height:'calc(100vh - 130px)',
    backgroundColor: 'rgb(48, 48, 48)'
}

const HEADING_STYLE = { 
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



const scrollbarStyle = {height: 'calc(100vh - 200px)', overflow: 'auto', maxHeight: 680}
interface iBarsPanel { title:string }
const BarsPanel = ({ title }: iBarsPanel) => {
    return <nav className='panel' style={GROWTH_STYLE}>
        <div className='panel-heading' style={HEADING_STYLE}> 
            { title } 
        </div>

        <div id='scrollbar' style={scrollbarStyle}>
            <BarTabs active={'engagements'} setActive={() => {}}/>
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
