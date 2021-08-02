import { Property } from 'csstype'

interface iKpi { label:string, value:number, color?:Property.Color ,isPercent?:boolean }
export const Kpi = ({ label, value, color, isPercent }:iKpi) => <div className='level-item level-engagement'>
    <p className='subtitle is-3' style={{color:'white', marginBottom: 20}}> 
        <small style={{fontSize: '1rem'}}>{label}</small> <br/>
        <span style={{color:color||'white'}}>{ value }</span>
        <small>{isPercent && '%'}</small>
    </p>
</div>