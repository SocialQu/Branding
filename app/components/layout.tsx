/* eslint-disable jsx-a11y/anchor-is-valid */

import type { ReactElement } from 'react'
import { useState } from 'react'
import Head from 'next/head'


export type Tab = 'Home' | 'KPIs' | 'Engagement Map' | 'Niche Analysis' | 'Topic Suggestions'

interface iNavTab {tab:Tab, isActive:boolean, clickTab(tab:Tab):void}
const NavTab = ({ tab, isActive, clickTab }:iNavTab) => <a 
    onClick={() => clickTab(tab)}
    style={{marginLeft:24}}
    className={`navbar-item ${isActive ? 'navbar-item-active': ''}`} 
> { tab } </a>

interface iNavBar { click(tab:Tab):void }
export const NavBar = ({ click }: iNavBar) => {
    const [ isActive, setActive ] = useState(false)
    const clickTab = (tab: Tab) => {
        isActive ? setActive(false) : setActive(isActive)
        return click(tab)
    }

    return <nav className="navbar is-black" role="navigation" aria-label="main navigation">
        <div className="container">
            <div className="navbar-brand">
                <a className="navbar-item" onClick={() => click('Home')}>
                    <img src="SocialQ.png" style={{ height:36, maxHeight: 'none' }} alt={'SocialQ logo'}/>
                    <p className="navbar-item" style={{ fontSize: '2em', color:'white' }} > SocialQ </p>
                </a>

                <a 
                    role="button" 
                    className={`navbar-burger ${isActive ? 'is-active': ''}`}
                    aria-label="menu" 
                    aria-expanded="false" 
                    data-target="navbarBasicExample"
                    onClick={()=> setActive(!isActive)}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div 
                style={{ maxWidth:1200 }}
                className={`navbar-menu ${isActive ? 'is-active navbar-menu-active': ''}`} 
            >
                <div 
                    style={{marginRight:'auto'}}
                    className={`navbar-start ${isActive ? 'is-active navbar-start-active': ''}`}
                >
                    {
                        ['KPIs', 'Topics', 'Engagement', 'Suggestions'].map((tab, i) => 
                            <NavTab isActive={isActive} tab={tab as Tab} clickTab={clickTab} key={i}/> 
                        )
                    }
                </div>
            </div>

            <div className={`navbar-end ${isActive ? 'navbar-end-active': ''}`} style={{fontSize: '1.2em'}} />
        </div>
    </nav>
}



interface iApp { children: ReactElement[] }
const Section = ({ children }: iApp) => <div className="section" style={{padding:'2rem' }}>
    <div className='container'> { children } </div>
</div>


export const Layout = ({ children }: iApp) =>   <div>
    <Head>
        <link rel="shortcut icon" href="/SocialQ.ico" />
        <title> SocialQ </title>
    </Head>

    <NavBar click={() => {}} />

    <Section>
        { children }
    </Section>
</div>
