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


interface iBarsPanel { title:string }
const BarsPanel = ({ title }: iBarsPanel) => {
    return <nav className='panel' style={GROWTH_STYLE}>
        <div className='panel-heading' style={HEADING_STYLE}> 
            { title } 
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
