import { CSSProperties } from 'react'

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

interface iCard {title: string, children?: any}
export const Card = ({ title, children }:iCard) => <div className='card' style={cardStyle}>
    <header className='card-header' style={headerStyle}>
        <p className='card-header-title' style={{color:'white'}}> { title } </p>
    </header>

    <div className='card-content' style={{padding: '0.5rem 1rem'}}>
        <div className='content'>
            { children }
        </div>
    </div>
</div>
