interface iKpi {
    value: number
    trend: number
    color: '007500' | 'A31700'
}

interface iKpis {
    followers: iKpi
    engagements: iKpi
    impressions: iKpi
    clicks: iKpi
    tweets: iKpi
    replies: iKpi
}
