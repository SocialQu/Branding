import { NavBar } from './components/NavBar'
import { Landing } from './views/Landing'
import { useState } from 'react'

import 'bulma/css/bulma.css'
import './App.css'


export const App = () => {
    const [ _, setTweet ] = useState('')

	const search = async(tweet:string):Promise<void> => setTweet(tweet)

	return <>
		<NavBar />
		<div className='section' style={{minHeight:'calc(100vh - 180px)', paddingBottom:0}}>
			<Landing search={search}/>
		</div>
	</>
}
