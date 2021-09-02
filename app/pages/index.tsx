import { EngagementMap } from '../components/EngagementMap'
import { Layout } from '../components/layout'
import { Bars } from '../components/Bars'
import { Kpis } from '../components/Kpi'


const Home = () => <Layout>
    <Kpis />
    <EngagementMap />
    <Bars />
</Layout>


export default Home

