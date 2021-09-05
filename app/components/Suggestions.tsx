/* eslint-disable jsx-a11y/anchor-is-valid */

import { ItemStyle, NameStyle, GrowthChartStyle } from './styles/Panel'
import { iSuggestions, iWordCloud } from '../types/data'
import ReactWordcloud from 'react-wordcloud'
import { Panel } from './molecules/Panel'


interface iSuggestion { topic:string, avgEngagement:number, positive?:boolean } 
const Suggestion = ({ topic, avgEngagement, positive }:iSuggestion) => <div 
    className='panel-block' 
    style={ItemStyle}
>
    <nav className='level' style={{marginTop:3, marginBottom:6}}>
        <div className='level-item div-keyword' style={{width:'50%'}}>
            <a className='subtitle is-5 keyword' style={NameStyle}> { topic } </a>
        </div>


        <div className='level-item has-text-centered level-icon'>
            <div>
                <p className='subtitle is-5' style={{color:'white'}}> 
                    { Math.round(avgEngagement*100)/100 } 
                    <span role='img' aria-label='fire'> { positive ? '🔥' : '❄️' } </span>
                </p>
            </div>
        </div>
    </nav>
</div>



const Tabs = ({ positive }:{ positive?:boolean }) => <p className='panel-tabs' style={{textAlign:'center'}}>
    <a style={{ color:'white', width:'50%' }}> Topic 🧾 </a>
    <a style={{ color:'white', width:'50%' }}> Avg Engagement { positive ? '🔥' : '❄️' } </a>
</p>


const filterWords = (words:iWordCloud[]) => words
    .filter((w) => w.text.length > 4)
    .filter((w) => !w.text.includes('https'))
    .filter((w) => !w.text.includes(`'`))
    .filter((w) => !w.text.includes('\n'))
    .map((w) => ({...w, text:w.text.replace(/[^\w\s]/gi, '')}))

export const Suggestions = ({positive, negative}:iSuggestions) => <div 
    className={'columns'} 
    style={{maxWidth:1200, margin:'auto'}}
>
    <Panel title={'Tweet More'}> 
        <Tabs positive/>
        <div className='panel-block' style={{...GrowthChartStyle, height:200}}>
            { process.browser && <ReactWordcloud words={filterWords(positive.words)}/> }
        </div>

        <> { positive.topics.map((s,i) => <Suggestion {...s} key={i} positive/> )} </>
    </Panel>

    <Panel title={'Tweet Less'}> 
        <Tabs />
        <div className='panel-block' style={{...GrowthChartStyle, height:200}}>
            { process.browser && <ReactWordcloud words={filterWords(negative.words)}/> }
        </div>
        
        <> { negative.topics.sort(() => -1).map((s,i) => <Suggestion {...s} key={i}/> )} </>
    </Panel>
</div>
