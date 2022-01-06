/* eslint-disable jsx-a11y/anchor-is-valid */

import { useMediaQuery } from 'react-responsive'
import { useState } from 'react'

const Title = () => {
    const largeScreen = useMediaQuery({ query: '(min-width: 900px)' })

    return <div style={{ marginBottom:'2em', marginTop:'2em' }}>
        <p className='title is-1 has-text-centered' style={{color:'white'}}> 
            Write your Best Tweet 🐦
        </p>
        {
            largeScreen && 
            <p 
                className='subtitle is-4 has-text-centered' 
                style={{color:'darkorange', marginBottom:'2em', marginTop:'1rem' }}
            > 
                Use Engageable's Text Editor to improve the delivery <br/> 
                of your message and get more <span style={{color:'white'}}>likes</span> & <span style={{color:'white'}}>replies</span>.
            </p>
        }
    </div>
}

const SearchBox = ({ search }: { search(tweet:string):void }) => {
    const [tweet, setTweet] = useState<string>('')

    return <div style={{ maxWidth:'100%' }}>
        <div className='control' style={{ margin:'auto' }}>
            <textarea 
                rows={7}
                value={tweet}
                className='textarea'
                style={{maxWidth:600, minWidth:'auto', margin:'auto'}}
                onChange={({ target: { value }}) => setTweet(value)}
                onKeyPress={({ key }) => key === 'Enter' ? search(tweet) : null}
                placeholder='Write a tweet and get word-by-word suggestions to improve the delivery of your idea.' 
            />
        </div>

        <div className='control' style={{ textAlign:'center', marginTop:'1em' }}>
            <a 
                className='button is-info' 
                onClick={() => search(tweet)} 
                style={{width:'100%', maxWidth:600, fontWeight:600, fontSize:'1.25rem'}
            }> Increase Engagement </a>
        </div>
    </div>
}


export const Landing = ({ search }: { search(tweet:string):void }) => <>
    <Title />
    <SearchBox search={search}/>
</>
