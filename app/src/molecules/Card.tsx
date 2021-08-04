/* eslint-disable jsx-a11y/anchor-is-valid */
import { CSSProperties, useState, ReactNode } from 'react'

import '@creativebulma/bulma-collapsible/dist/css/bulma-collapsible.min.css'
import '@fortawesome/fontawesome-free/css/all.css'


const cardStyle:CSSProperties = {
    backgroundColor: 'rgb(48, 48, 48)',
    borderRadius: 12,
    maxWidth:460,
    margin: 'auto',
    marginBottom: '1.5em',
    border: '1px solid white'
}

const headerStyle:CSSProperties = {
    backgroundColor: 'rgb(72, 72, 72)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
}

interface iCard {title: string, children?: ReactNode, extra?: ReactNode}
export const Card = ({ title, children, extra }:iCard) => {
    const [isHidden, setHidden] = useState(true)

    return <div className='card' style={cardStyle}>
        <header className='card-header' style={headerStyle}>
            <p className='card-header-title' style={{color:'white'}}> { title } </p>
            {
                extra && 
                <a data-action="collapse" className="card-header-icon" onClick={() => setHidden(!isHidden)}>
                    <span className="icon" style={{color:'white'}}>
                        <i className={`fas fa-angle-${isHidden ? 'down' : 'up'}`} aria-hidden="true"/>
                    </span>
                </a>        
            }
        </header>

        <div className='card-content' style={{padding: '0.5rem 1rem'}}>
            <div className='content'>
                { children }
            </div>
        </div>

        <div id="collapsible-card" className="is-collapsible" style={{height:isHidden ? 0 : 'auto'}}>
            <div className="card-content">
                { extra }
            </div>
        </div>
    </div>
}
