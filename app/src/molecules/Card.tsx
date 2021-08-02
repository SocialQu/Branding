export const Card = ({ title, children }: {title: string, children?: any}) => <div 
    className='card'
    style={{
        backgroundColor: 'rgb(48, 48, 48)',
        borderRadius: 12,
        maxWidth:460,
        margin: 'auto',
        marginBottom: '1.5em',
        border: '1px solid white'
    }}
>
    <header 
        className='card-header' 
        style={{
            backgroundColor: 'rgb(72, 72, 72)',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
        }}
    >
        <p className='card-header-title' style={{color:'white'}}> { title } </p>
    </header>

    <div className='card-content' style={{padding: '0.5rem 1rem'}}>
        <div className='content'>
            { children }
        </div>
    </div>
</div>
