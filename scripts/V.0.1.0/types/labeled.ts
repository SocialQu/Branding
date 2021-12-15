import { iMetrics } from './aggregated'


export type Duple = 1 | 0

export interface iInputs {
    // Bio
    followers: number
    following: number

    // Reply
    isReply: Duple

    // Emojis
    hasEmojis: Duple
    emojis: number

    // Length
    characterLength: number
    wordLength: number
    sentenceLength: number
    pargagraphLength: number

    // Line breaks
    hasLineBreaks: Duple
    lineBreaks: number

    // Media
    hasMedia: Duple
    media: number

    // Links
    hasLinks: Duple
    links: number

    // Hashtags
    hasHashtags: Duple
    hashtags: number

    // Mentions
    hasMentions: Duple
    mentions: number

    // Datetime
    isWeekDay: Duple
    isDaytime: Duple

    // Last tweet
    hoursFromLastTweet?: number
    hoursFromLastStatus?: number // includes replies

    // Recent metrics
    lastTweetLikes?: number
    lastTweetVisits?: number
    lastTweetClicks?: number
    lastTweetReplies?: number
    lastTweetRetweets?: number
    lastTweetImpressions?: number
}

export interface iOutputs extends iMetrics { engagements:number }
export interface iLabeledTweet extends iInputs, iOutputs {}
