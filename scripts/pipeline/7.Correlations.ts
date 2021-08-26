import { iKpi, iKpis, iAnalysis } from '../types/analysis'
import data from '../data/training/buildData.json'
import { iBuildData } from '../types/build'



const getKpis = ():iKpis => {
    const baseKpi:iKpi = { average:0, trend:0 }

    const { tweetDays }:iBuildData = data

    const tweets:iKpi = {
        average: tweetDays.reduce((d, { tweets }) => d += tweets, 0)/tweetDays.length,
        trend: 0
    }

    const engagements:iKpi = {
        average: tweetDays.reduce((d, { engagements }) => d += engagements, 0)/tweetDays.length,
        trend: 0
    }

    const impressions:iKpi = {
        average: tweetDays.reduce((d, { impressions }) => d += impressions, 0)/tweetDays.length,
        trend: 0
    }

    const newFollowers:iKpi = {
        average: tweetDays.reduce((d, { newFollowers }) => d += newFollowers, 0)/tweetDays.length,
        trend: 0
    }

    return { tweets, engagements, impressions, newFollowers }
}

const analyzeData = ():iAnalysis => ({ ...data, kpis:getKpis() })

analyzeData()
