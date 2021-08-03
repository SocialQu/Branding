import { Property } from 'csstype'


const numberFormatter = (num:number):string => {
    if(num < 1000) return `${num}`
    if(num < 1000*10) return new Intl.NumberFormat().format(num)
    if(num < 1000*100) return `${Math.round(num/100)/10}k`
    if(num < 1000*1000) return `${Math.round(num/1000)}k`
    return `${Math.round(num/100000)/10}M`
}

interface iKpi { label:string, value:number, color?:Property.Color ,isPercent?:boolean }
export const Kpi = ({ label, value, color, isPercent }:iKpi) => <div className='level-item level-kpi'>
    <p style={{color:'white'}}> 
        <small style={{fontSize: '1rem'}}>{label}</small> <br/>
        <span 
            className="subtitle is-2" 
            style={{color:color||'white', fontSize:!isPercent ? '2.5rem' : '2.25rem'}}
        > { numberFormatter(value) }</span>
        <small style={{fontSize:'1.5em'}}>{isPercent && '%'}</small>
    </p>
</div>