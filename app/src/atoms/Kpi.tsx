interface iKpi { label:string, value:number }
export const Kpi = ({ label, value }:iKpi) => <div className='level-item level-engagement'>
    <p className='subtitle is-3' style={{color: 'white', marginBottom: 20}}> 
        <small style={{fontSize: '1rem'}}>{label}</small> <br/>
        <>{ value }<small>%</small></>
    </p>
</div>