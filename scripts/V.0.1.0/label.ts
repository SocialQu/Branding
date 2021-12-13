import { Duple, iLabeledData } from './types/labeled'
import { iAggregatedUser } from './types/aggregated'


const toDuple = (dual:boolean):Duple => dual ? 1 : 0

const label = ({ tweets, ...data }: iAggregatedUser):iLabeledData[] => tweets.map((t, i) => {

    const date = new Date(t.datetime)
    const hours = date.getHours()
    const day = date.getDay()

    const lastTweet = tweets[i + 1]

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

        isDaytime: toDuple(hours > 9 && hours < 21),
        isWeekDay: toDuple(day === 0 || day === 6),

        hoursFromLastStatus: 0,
        hoursFromLastTweet: 0,

        lastTweetLikes: lastTweet.metrics.likes,
        lastTweetReplies:lastTweet.metrics.replies,
        lastTweetClicks: lastTweet.metrics.clicks,
        lastTweetVisits: lastTweet.metrics.visits,
        lastTweetRetweets: lastTweet.metrics.retweets,
        lastTweetImpressions: lastTweet.metrics.impressions,

        ...t.metrics
    }
})
