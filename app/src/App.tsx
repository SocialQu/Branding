import { NavBar } from './layout/NavBar'
import { kpiData } from './data/kpis'
import { Kpis } from './views/Kpis'


import { ReactNode } from 'react'
import 'bulma/css/bulma.css'
import './App.css'


interface iSection { children:ReactNode }
const Section = ({ children }:iSection) => <div className="section" style={{padding:'2rem' }}>
    <div className='container'> { children } </div>
</div>


export const App = () => <>
    <NavBar click={() => {}}/>
    <Section>
        <Kpis data={kpiData}/>
    </Section>
</>
