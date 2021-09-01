import type { ReactElement } from 'react'
import Head from 'next/head'

import 'bulma/css/bulma.css'


interface iApp { children: ReactElement }
const Section = ({ children }: iApp) => <div className="section" style={{padding:'2rem' }}>
    <div className='container'> { children } </div>
</div>


export const Layout = ({ children }: iApp) =>   <div>
    <Head>
        <link rel="shortcut icon" href="/SocialQ.ico" />
        <title> SocialQ </title>
    </Head>

    <Section>
        { children }
    </Section>
</div>
