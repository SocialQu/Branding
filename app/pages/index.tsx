import { EngagementMap } from '../components/EngagementMap'
import { Suggestions } from '../components/Suggestions'
import { Layout } from '../components/layout'
import { Bars } from '../components/Bars'
import { Kpis } from '../components/Kpi'

import data from '../data/data.json'


const { kpis, content, audience } = data
const Home = () => <Layout>
    <Kpis {...kpis} />
    <Bars content={content} audience={audience} />
    <EngagementMap />
    <Suggestions />
</Layout>


export default Home
