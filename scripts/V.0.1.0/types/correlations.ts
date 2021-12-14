import { iMetrics  } from './aggregated'

interface iCorrelations extends iMetrics { engagements:number }

// Stores the correlation coefficient [-1, 1] for each output in a matrix.
export interface iOutputCorrelations {
    likes: iCorrelations
    clicks: iCorrelations
    visits: iCorrelations
    replies: iCorrelations
    retweets: iCorrelations
    impressions: iCorrelations
}

export interface iInputCorrelations {
    // Bio
    followers: iCorrelations
    following: iCorrelations

    // Reply
    isReply: iCorrelations

    // Emojis
    hasEmojis: iCorrelations
    emojis: iCorrelations

    // Length
    characterLength: iCorrelations
    wordLength: iCorrelations
    sentenceLength: iCorrelations
    pargagraphLength: iCorrelations

    // Line breaks
    hasLineBreaks: iCorrelations
    lineBreaks: iCorrelations

    // Media
    hasMedia: iCorrelations
    media: iCorrelations

    // Links
    hasLinks: iCorrelations
    links: iCorrelations

    // Hashtags
    hasHashtags: iCorrelations
    hashtags: iCorrelations

    // Mentions
    hasMentions: iCorrelations
    mentions: iCorrelations

    // Datetime
    isWeekDay: iCorrelations
    isDaytime: iCorrelations

    // Last tweet
    hoursFromLastTweet: iCorrelations
    hoursFromLastStatus: iCorrelations

    // Recent metrics
    lastTweetLikes: iCorrelations
    lastTweetVisits: iCorrelations
    lastTweetClicks: iCorrelations
    lastTweetReplies: iCorrelations
    lastTweetRetweets: iCorrelations
    lastTweetImpressions: iCorrelations
}

export interface iDatetimeCorrelations {
    days: { day:string, correlations:iCorrelations }[]
    hours: { hour:string, correlation:iCorrelations }[]
}
