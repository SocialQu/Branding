import { CSSProperties, ReactNode } from 'react'


const CardStyle:CSSProperties = {
    backgroundColor: 'rgb(48, 48, 48)',
    borderRadius: 12,
    maxWidth:460,
    margin: 'auto',
    border: '1px solid white'
}

const headerStyle:CSSProperties = {
    backgroundColor: 'rgb(72, 72, 72)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
}


interface iCard {title:string, children?:ReactNode, cardStyle?:CSSProperties }
export const Card = ({ title, children, cardStyle={} }: iCard) => <div 
    className='card' 
    style={{...CardStyle, ...cardStyle }
}>
    <header className='card-header' style={headerStyle}>
        <p className='card-header-title' style={{color:'white', fontSize:'1.25em'}}> { title } </p>
    </header>

    <div className='card-content' style={{padding: '0.5rem 1rem'}}>
        <div className='content'>
            { children }
        </div>
    </div>
</div>
