import { iEmailKpis, iEmailMetrics } from './types/email'
import { iData } from './types/data'

const formatNumber = (value:number):string => String(value)

export const buildEmailMetrics = ({ kpis }:iData):iEmailMetrics => {
    const { followers, engagements, impressions, clicks, tweets, replies } = kpis

    const emailKpis: iEmailKpis = {
        followers: formatNumber(followers.value),
        new_followers: formatNumber(followers.trend),
        follower_color: followers.color,

        engagements: formatNumber(engagements.value),
        engagements_trend: formatNumber(engagements.trend),
        engagements_color: engagements.color,

        impressions: formatNumber(impressions.value),
        impressions_trend: formatNumber(impressions.trend),
        impressions_color: impressions.color,

        clicks: formatNumber(clicks.value),
        clicks_trend: formatNumber(clicks.trend),
        clicks_color: clicks.color,

        tweets: formatNumber(tweets.value),
        tweets_trend: formatNumber(tweets.trend),
        tweets_color: tweets.color,

        replies: formatNumber(replies.value),
        replies_trend: formatNumber(replies.trend),
        replies_color: replies.color
    }    
}

export const writeJSON = () => {}
export const sendEmail = () => {}
