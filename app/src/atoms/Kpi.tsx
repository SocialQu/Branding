import { Property } from 'csstype'

interface iKpi { label:string, value:number, color?:Property.Color ,isPercent?:boolean }
export const Kpi = ({ label, value, color, isPercent }:iKpi) => <div className='level-item level-kpi'>
    <p style={{color:'white'}}> 
        <small style={{fontSize: '1rem'}}>{label}</small> <br/>
        <span 
            className="subtitle is-2" 
            style={{color:color||'white', fontSize:!isPercent ? '2.5rem' : '2.25rem'}}
        > { value }</span>
        <small style={{fontSize:'1.5em'}}>{isPercent && '%'}</small>
    </p>
</div>