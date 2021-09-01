import type { ReactElement } from 'react'
import 'bulma/css/bulma.css'


interface iApp { children: ReactElement }
const Section = ({ children }: iApp) => <div className="section" style={{padding:'2rem' }}>
    <div className='container'> { children } </div>
</div>


export const Layout = ({ children }: iApp) => <Section>
    { children }
</Section>
