/* eslint-disable jsx-a11y/anchor-is-valid */

import type { ReactElement } from 'react'
import { CSSProperties } from 'react'


const GrowthStyle:CSSProperties = { 
    maxWidth:460, 
    margin: 'auto', 
    border:'2px solid white', 
    backgroundColor: 'rgb(48, 48, 48)'
}

const HeadingStyle:CSSProperties = { 
    color: 'white', 
    textAlign: 'center' as const,
    borderBottom: '1px solid white',
    backgroundColor: 'rgb(72, 72, 72)'
}


interface iPanel { title:string, children?:ReactElement[] }
export const Panel = ({ title, children }:iPanel) => <div className={'column'} style={{margin:'24px auto 48px'}}>
    <nav className='panel' style={GrowthStyle}>
        <div className='panel-heading' style={HeadingStyle}> 
            { title } 
        </div>

        { children }
    </nav>
</div>
