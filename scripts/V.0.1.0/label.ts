import { iAggregatedUser } from './types/aggregated'
import { iLabeledData } from './types/labeled'


const label = ({ tweets, ...data }: iAggregatedUser):iLabeledData[] => tweets.map(() => ({
    followers: data.followers,
    following: data.following,

    isReply: 0,

    emojis: 0,
    hasEmojis: 0,

    characterLength: 0,
    wordLength: 0,
    sentenceLength: 0,

    lineBreaks: 0,
    hasLineBreaks: 0,

    links: 0,
    hasLinks: 0,

    hasMedia: 0,
    media: 0,

    hasHashtags: 0,
    hashtags: 0,

    hasMentions: 0,
    mentions: 0,

    isDaytime: 0,
    isWeekDay: 0,

    hoursFromLastStatus: 0,
    hoursFromLastTweet: 0,

    lastTweetLikes: 0,
    lastTweetReplies:0,
    lastTweetClicks: 0,
    lastTweetVisits: 0,
    lastTweetRetweets: 0,
    lastTweetImpressions: 0,

    likes:0,
    clicks: 0,
    visits: 0,
    replies: 0,
    retweets: 0,
    impressions: 0
}))
