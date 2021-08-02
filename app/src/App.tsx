import { NavBar } from './layout/NavBar'
import { Kpis } from './views/Kpis'

import 'bulma/css/bulma.css'
import './App.css'


export const App = () => <>
    <NavBar click={() => {}}/>
    <div className="section" style={{padding:'2rem' }}>
        <div className='container'>
            <Kpis />
        </div>
    </div>
</>
