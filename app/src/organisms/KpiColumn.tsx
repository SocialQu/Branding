import { EngagementRate } from '../charts/EngagementRate'

const data = [{Engagement:10, name:'Monday'}, {Engagement:5, name:'Tuesday'}]
export const LastDayKpis = () => <EngagementRate data={data}/>
