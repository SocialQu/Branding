import { iInputCorrelations, iOutputCorrelations } from './types/correlations'
import { iLabeledTweet, iOutputs as iCorrelations } from './types/labeled'
import { sampleCorrelation } from 'simple-statistics'
import tweets from './data/labeledData.json'
import { writeFile } from 'fs/promises'


type feature = keyof iLabeledTweet
type label = keyof iCorrelations

interface iGetSingleCorrelation { tweets:iLabeledTweet[], X:feature }
interface iGetCorrelation extends iGetSingleCorrelation { Y:label }

const getCorrelation = ({ tweets, X, Y }: iGetCorrelation):number => +sampleCorrelation(
    tweets.filter(t => t[X]).map(t => t[X] as number), tweets.map(t => t[Y] as number)
).toFixed(3)

const getSingleCorrelation = ({ tweets, X }:iGetSingleCorrelation):iCorrelations => ({
    likes: getCorrelation({ tweets, X, Y:'likes' }),
    visits: getCorrelation({ tweets, X, Y:'visits' }),
    clicks: getCorrelation({ tweets, X, Y:'clicks' }),
    replies: getCorrelation({ tweets, X, Y:'replies' }),
    retweets: getCorrelation({ tweets, X, Y:'retweets' }),
    impressions: getCorrelation({ tweets, X, Y:'impressions' }),
    engagements: getCorrelation({ tweets, X, Y:'engagements' })
})

const getOutputCorrelations = (tweets:iLabeledTweet[]):iOutputCorrelations => ({
    likes: getSingleCorrelation({ tweets, X:'likes' }),
    replies: getSingleCorrelation({ tweets, X:'replies' }),
    retweets: getSingleCorrelation({ tweets, X:'retweets' }),
    visits: getSingleCorrelation({ tweets, X:'visits' }),
    clicks: getSingleCorrelation({ tweets, X:'clicks' }),
    impressions: getSingleCorrelation({ tweets, X:'impressions' }),
    engagements: getSingleCorrelation({ tweets, X:'engagements' }),
})

const getFeatureCorrelations = (tweets:iLabeledTweet[]):iInputCorrelations => ({
    followers: getSingleCorrelation({ tweets, X:'followers' }),
    following: getSingleCorrelation({ tweets, X:'following' }),
    isReply: getSingleCorrelation({ tweets, X:'isReply' }),
    hasEmojis: getSingleCorrelation({ tweets, X:'hasEmojis' }),
    emojis: getSingleCorrelation({ tweets, X:'emojis' }),
    characterLength: getSingleCorrelation({ tweets, X:'characterLength' }),
    wordLength: getSingleCorrelation({ tweets, X:'wordLength' }),
    sentenceLength: getSingleCorrelation({ tweets, X:'sentenceLength' }),
    pargagraphLength: getSingleCorrelation({ tweets, X:'pargagraphLength' }),
    hasLineBreaks: getSingleCorrelation({ tweets, X:'hasLineBreaks' }),
    lineBreaks: getSingleCorrelation({ tweets, X:'lineBreaks' }),
    hasMedia: getSingleCorrelation({ tweets, X:'hasMedia' }),
    media: getSingleCorrelation({ tweets, X:'media' }),
    hasLinks: getSingleCorrelation({ tweets, X:'hasLinks' }),
    links: getSingleCorrelation({ tweets, X:'links' }),
    hasHashtags: getSingleCorrelation({ tweets, X:'hasHashtags' }),
    hashtags: getSingleCorrelation({ tweets, X:'hashtags' }),
    hasMentions: getSingleCorrelation({ tweets, X:'hasMentions' }),
    mentions: getSingleCorrelation({ tweets, X:'mentions' }),
    isWeekDay: getSingleCorrelation({ tweets, X:'isWeekDay' }),
    isDaytime: getSingleCorrelation({ tweets, X:'isDaytime' }),
    hoursFromLastTweet: getSingleCorrelation({ tweets, X:'hoursFromLastTweet' }),
    hoursFromLastStatus: getSingleCorrelation({ tweets, X:'hoursFromLastStatus' }),
    lastTweetLikes: getSingleCorrelation({ tweets, X:'lastTweetLikes' }),
    lastTweetVisits: getSingleCorrelation({ tweets, X:'lastTweetVisits' }),
    lastTweetClicks: getSingleCorrelation({ tweets, X:'lastTweetClicks' }),
    lastTweetReplies: getSingleCorrelation({ tweets, X:'lastTweetReplies' }),
    lastTweetRetweets: getSingleCorrelation({ tweets, X:'lastTweetRetweets' }),
    lastTweetImpressions: getSingleCorrelation({ tweets, X:'lastTweetImpressions' }),
})


const getCorrelations = async(tweets:iLabeledTweet[]) => {
    const outputsCorrelationMatrix = getOutputCorrelations(tweets)
    const outputsMatrixData = JSON.stringify(outputsCorrelationMatrix)
    await writeFile('./data/correlations/outputsMartix.json', outputsMatrixData)

    // console.log(outputsCorrelationMatrix)

    const inputCorrelationMatrix = getFeatureCorrelations(tweets)
    console.log(inputCorrelationMatrix)
}


getCorrelations(tweets as iLabeledTweet[]).catch(console.log)
