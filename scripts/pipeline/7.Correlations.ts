import { iKpi, iKpis, iAnalysis } from '../types/analysis'
import data from '../data/training/buildData.json'
import { iBuildData } from '../types/build'



const getKpis = ():iKpis => {
    const baseKpi:iKpi = { average:0, trend:0 }

    const { tweetDays }:iBuildData = data

    const tweets:iKpi = {
        average: tweetDays.reduce((d, { tweets }) => d += tweets.length, 0)/tweetDays.length,
        trend: 0
    }

    return {
        tweets,
        engagements: baseKpi,
        impressions: baseKpi,
        newFollowers: baseKpi
        
    }
}

const analyzeData = ():iAnalysis => ({ ...data, kpis:getKpis() })

analyzeData()
