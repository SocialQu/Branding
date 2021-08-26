// npx ts-node 7.Correlations

import { iKpi, iKpis, iAnalysis } from '../types/analysis'
import data from '../data/training/buildData.json'
import { iBuildData } from '../types/build'
import regression, { DataPoint } from 'regression'


type kpi = 'tweets' | 'engagements' | 'impressions' | 'newFollowers'
const getKPI = (metric:kpi):iKpi => {
    const { tweetDays }:iBuildData = data
    const average = tweetDays.reduce((d, i) => d += i[metric], 0)/tweetDays.length

    const values = tweetDays.map((i, idx) => [idx, i[metric]] as DataPoint)
    const { r2 } = regression.linear(values)

    const kpi = { average, trend:r2 | 0 }
    console.log('kpi:', kpi)

    return kpi
}

const getKpis = ():iKpis => {
    const tweets:iKpi = getKPI('tweets')
    const engagements:iKpi = getKPI('engagements')
    const impressions:iKpi = getKPI('impressions')
    const newFollowers:iKpi = getKPI('newFollowers')

    return { tweets, engagements, impressions, newFollowers }
}

const analyzeData = ():iAnalysis => ({ ...data, kpis:getKpis() })

analyzeData()
