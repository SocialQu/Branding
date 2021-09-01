import { Reach, Activity } from '../components/Kpi'
import { Layout } from '../components/layout'


const Home = () => <Layout>
    <>
        <Activity tweets={34} replies={45}/>
        <Reach impressions={34} followers={45}/>
    </>
</Layout>


export default Home

