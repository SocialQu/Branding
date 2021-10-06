export interface iKpi {
    value: number
    trend: number
    color: '007500' | 'A31700'
}

export interface iKpis {
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

export interface iBestTweets {
    profile: iProfile
    tweets: iTweet[]
}


interface iTopic {
    name: string
    text: string
    color: string
    width: number
    tweets: number
    impressions: number
    engagements: number
}


interface iTopFollower {
    bio: string
    link: string
    name: string
    image: string
}

interface iFollower {
    name: string
    link: string
    image: string
    color: string
    niche: number
    ratio: number
    followers: number
    textColor: 'black' | 'white'
    ratioColor: 'A31700' | '007500'
}

interface iFollowers {
    topFollower: iTopFollower
    followers: iFollower[]
}


interface iReply {
    image: string
    name: string
    link: string
    percent: number
    impressions: number
    engagements: number    
}


export interface iData {
    kpis: iKpis
    bestTweets: iBestTweets
    topics: iTopic[]
    followers: iFollowers
    replies: iReply[]
}
