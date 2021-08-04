import { LastWeek } from '../organisms/LastWeek'
import { LastDay } from '../organisms/LastDay'
import { iKpis } from '../types'

export const Kpis = ({ data }: { data: iKpis}) => <div className='columns'>
    <LastDay data={data.lastDay}/>
    <LastWeek data={data.lastWeek}/>
</div>
