/* eslint-disable jsx-a11y/anchor-is-valid */

/*
import { iData } from '../Utils/Types'


import { useState } from 'react'

import 'tippy.js/animations/scale.css'
import 'tippy.js/dist/tippy.css'


export type ClicksTab = 'impressions' | 'clicks'| 'engagements' 
export const mapTweets = (data:iData, order:ClicksTab) => data.tweets.map(t => ({ 
    ...t,
    clicks: t.kpis.Clicks || 0,
    impressions: t.kpis.Impressions,
    engagements: t.kpis.Likes + t.kpis.Replies + t.kpis.Replies + t.kpis.Visits
})).sort(({[order]: a}, {[order]: b}) => a > b ? -1 : 1)


const DealsList = ({ data }: { data:iData }) => {
    const [ tweet, setTweet ] = useState(-1)
    const [ tweets, setTweets ] = useState(mapTweets(data, 'clicks'))
    const [ active, setActive ] = useState<ClicksTab>('clicks')

    const changeTab = (order:ClicksTab) => {
        setActive(order)
        setTweets(mapTweets(data, order))
        setTweet(-1)
    }

    return <div 
        id='scrollbar'
        style={{height: 'calc(100vh - 200px)', overflow: 'auto', maxHeight: 680}} 
    >
        <p className='panel-tabs'>
            <a
                className={`${active === 'impressions' ? 'is-active' : '' }`}
                style={{color:`${active === 'impressions' ? 'orange' : 'white' }`, width:150}} 
                onClick={() => changeTab('impressions')}
            > 
                Impressions 
                <span role='img' aria-label='eyes'> 👀 </span>
            </a>

            <a 
                className={`${active === 'clicks' ? 'is-active' : '' }`}
                style={{color:`${active === 'clicks' ? 'orange' : 'white' }`, width:150}} 
                onClick={() => changeTab('clicks')}
            > 
                Clicks 
                <span role='img' aria-label='mouse'> 🖱️ </span>
            </a>

            <a 
                className={`${active === 'engagements' ? 'is-active' : '' }`}
                style={{color:`${active === 'engagements' ? 'orange' : 'white' }`, width:150}} 
                onClick={() => changeTab('engagements')}
            > 
                Engagements 
                <span role='img' aria-label='fire'> 🔥 </span>
            </a>
        </p>



        { 
            tweets.map((e, i) => 
                <div 
                    key={i} 
                    className='panel-block' 
                    style={{display: 'block', backgroundColor: 'rgb(48, 48, 48)'}}
                > 
                    <nav className='level' style={{marginTop:3, marginBottom:6}}>
                        <div className='level-item has-text-centered level-icon'>
                            <div>
                                <p className='subtitle is-5' style={{color:'white'}}> 
                                    { e.impressions } <span role='img' aria-label='eyes'> 👀 </span>
                                </p>
                            </div>
                        </div>

                        <div className='level-item has-text-centered level-icon'>
                            <div>
                                <p className='subtitle is-5' style={{color:'white'}}> 
                                    { e.clicks } <span role='img' aria-label='fire'> 🖱️ </span>
                                </p>
                            </div>
                        </div>

                        {
                            i !== tweet
                            ?
                                <div className='level-item has-text-centered level-icon'>
                                    <div>
                                        <p className='subtitle is-5' style={{color:'white'}}> 
                                            { e.engagements } <span role='img' aria-label='fire'> 🔥 </span>
                                        </p>
                                    </div>
                                </div>

                            :
                                <>
                                    <div className='level-item has-text-centered level-icon'>
                                        <div>
                                            <p className='subtitle is-5' style={{color:'white'}}> 
                                                { e.kpis.Likes } <span role='img' aria-label='bird'> ❤️ </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className='level-item has-text-centered level-icon'>
                                        <div>
                                            <p className='subtitle is-5' style={{color:'white'}}> 
                                                { e.kpis.Replies } <span role='img' aria-label='bird'> 🔁 </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className='level-item has-text-centered level-icon'>
                                        <div>
                                            <p className='subtitle is-5' style={{color:'white'}}> 
                                                { e.kpis.Retweets } <span role='img' aria-label='bird'> 💭 </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className='level-item has-text-centered level-icon'>
                                        <div>
                                            <p className='subtitle is-5' style={{color:'white'}}> 
                                                { e.kpis.Visits } <span role='img' aria-label='bird'> 👤 </span>
                                            </p>
                                        </div>
                                    </div>
                                </>
                        }
                    </nav>

                    <p style={{textAlign:'left'}} onClick={() => setTweet(tweet !== i ? i : i) }>
                        { 
                            i === tweet
                            ?   
                                <a 
                                    style={{color:'white', marginRight:'auto'}} 
                                    onClick={() => window.open(`https://twitter.com/${data.userName}/status/${e.id}`)}
                                > { e.text } </a>

                            :   <a  style={{color:'darkgray', marginRight:'auto'}} > { e.text.substring(0, 90) } ... </a>
                        }
                    </p>
                </div>
            )
        }
    </div>

}

export const Deals = ({ data }: { data:iData }) => <div className="column" style={{textAlign: 'center'}} >
    <nav className='panel'>
        <p className='panel-heading'> Your Promotions </p>
        <DealsList 
            data={{
                ...data, 
                followers: data.followers.sort(({ followers: a }, { followers: b})=> a > b ? -1 : 1),
                following: data.following.sort(({ followers: a }, { followers: b})=> a > b ? -1 : 1)
            }} />
    </nav>
</div>
*/

export const Tweet = () => <a  style={{color:'darkgray', marginRight:'auto'}} > 
    { 'e.text.substring(0, 90)' } ... 
</a>
