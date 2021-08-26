import { iKpi, iKpis, iAnalysis } from '../types/analysis'
import data from '../data/training/buildData.json'


const getKpis = ():iKpis => {
    const baseKpi:iKpi = { average:0, trend:0 }

    return {
        tweets: baseKpi,
        engagements: baseKpi,
        impressions: baseKpi,
        newFollowers: baseKpi
        
    }
}

const analyzeData = ():iAnalysis => ({ ...data, kpis:getKpis() })

analyzeData()
