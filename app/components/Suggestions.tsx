/* eslint-disable jsx-a11y/anchor-is-valid */

import { ItemStyle, NameStyle, GrowthChartStyle } from './styles/Panel'
import ReactWordcloud from 'react-wordcloud'
import { Panel } from './molecules/Panel'


interface iSuggestion { topic:string, avgEngagement:number } 
const Suggestion = ({ topic, avgEngagement }:iSuggestion) => <div className='panel-block' style={ItemStyle}>
    <nav className='level' style={{marginTop:3, marginBottom:6}}>
        <div className='level-item div-keyword' style={{width:'50%'}}>
            <a className='subtitle is-5 keyword' style={NameStyle}> { topic } </a>
        </div>


        <div className='level-item has-text-centered level-icon'>
            <div>
                <p className='subtitle is-5' style={{color:'white'}}> 
                    { avgEngagement } <span role='img' aria-label='fire'> 🔥 </span>
                </p>
            </div>
        </div>
    </nav>
</div>


const suggestions:iSuggestion[] = [
    { topic:'Topic 1', avgEngagement:3.5 },
    { topic:'Topic 2', avgEngagement:3.5 },
    { topic:'Topic 3', avgEngagement:3.5 },
    { topic:'Topic 4', avgEngagement:3.5 },
    { topic:'Topic 5', avgEngagement:3.5 },
    { topic:'Topic 6', avgEngagement:3.5 },
    { topic:'Topic 7', avgEngagement:3.5 },
    { topic:'Topic 8', avgEngagement:3.5 },
    { topic:'Topic 9', avgEngagement:3.5 },
    { topic:'Topic 10', avgEngagement:3.5 }
]

const Tabs = () => <p className='panel-tabs' style={{textAlign:'center'}}>
    <a style={{ color:'white', width:'50%', paddingLeft:24, textAlign:'left' }}> Topic </a>
    <a style={{ color:'white', width:'50%', textAlign:'right', paddingRight:36 }}> Avg Engagement </a>
</p>


export const Suggestions = () => <div className={'columns'} style={{maxWidth:1200, margin:'auto'}}>
    <Panel title={'Tweet More'}> 
        <div className='panel-block' style={{...GrowthChartStyle, height:200}}>
            { process.browser && <ReactWordcloud words={[{ text:'Marketing', value:5 }]}/> }
        </div>

        <Tabs />
        <> { suggestions.map((s,i) => <Suggestion {...s} key={i}/> )} </>
    </Panel>

    <Panel title={'Tweet Less'}> 
        <div className='panel-block' style={{...GrowthChartStyle, height:200}}>
            { process.browser && <ReactWordcloud words={[{ text:'Marketing', value:5 }]}/> }
        </div>
        
        <Tabs />
        <> { suggestions.map((s,i) => <Suggestion {...s} key={i}/> )} </>
    </Panel>
</div>
