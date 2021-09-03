import { EngagementMap } from '../components/EngagementMap'
import { Suggestions } from '../components/Suggestions'
import { Layout } from '../components/layout'
import { Bars } from '../components/Bars'
import { Kpis } from '../components/Kpi'


const Home = () => <Layout>
    <Kpis />
    <Bars />
    <EngagementMap />
    <Suggestions />
</Layout>


export default Home
