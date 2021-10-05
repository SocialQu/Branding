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


interface iProfile {
    name: string
    handle: string
    link: string
    image: string
}

interface iTweet {
    date: Date
    text: string
    link: string
    likes: number
    replies: number
    retweets: number
    impressions: number
    profile_visits: number
}

interface iBestTweets {
    profile: iProfile
    tweets: iTweet[]
}


interface iTopic {
    name: string
    text: string
    width: string
    color: string
    tweets: string
    impressions: string
    engagements: string
}
