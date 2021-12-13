import { Duple, iLabeledData } from './types/labeled'
import { iAggregatedUser } from './types/aggregated'


const toDuple = (dual:boolean):Duple => dual ? 1 : 0

const label = ({ tweets, ...data }: iAggregatedUser):iLabeledData[] => tweets.map(t => {

    return {
        followers: data.followers,
        following: data.following,

        isReply: toDuple(t.isReply),

        emojis: 0,
        hasEmojis: 0,

        characterLength: t.text.length,
        wordLength: t.text.split(/[\s]+/).length,
        sentenceLength: t.text.split('.').length,
        pargagraphLength: t.text.split('\n').length,

        lineBreaks: (t.text.match(/\n/g) || []).length,
        hasLineBreaks: toDuple(!!(t.text.match(/\n/g) || []).length),

        links: t.entities.links.length,
        hasLinks: toDuple(!!t.entities.links.length),

        media: t.entities.media.length,
        hasMedia: toDuple(!!t.entities.media.length),

        hashtags: t.entities.hashtags.length,
        hasHashtags: toDuple(!!t.entities.hashtags.length),

        mentions: t.entities.mentions.length,
        hasMentions: toDuple(!!t.entities.mentions.length),

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

        ...t.metrics
    }
})
