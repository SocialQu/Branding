import { iDatetimeCorrelations, iInputCorrelations, iOutputCorrelations } from './types/correlations'
import { iLabeledTweet, iOutputs as iCorrelations } from './types/labeled'
import { sampleCorrelation } from 'simple-statistics'
import tweets from './data/labeledData.json'
import { writeFile } from 'fs/promises'


type feature = keyof iLabeledTweet
type label = keyof iCorrelations

interface iGetSingleCorrelation { tweets:iLabeledTweet[], x:feature }
interface iGetCorrelation extends iGetSingleCorrelation { y:label }

const getCorrelation = ({ tweets, x, y }: iGetCorrelation):number => {
    const T = tweets.filter(t => t[x] !== undefined)
    const X = T.map(t => t[x] as number)
    const Y = T.map(t => t[y] as number)
    
    const correlation = sampleCorrelation(X, Y)
    const rho = Math.round(correlation*1000)/1000

    return rho
}

const getSingleCorrelation = ({ tweets, x }:iGetSingleCorrelation):iCorrelations => ({
    likes: getCorrelation({ tweets, x, y:'likes' }),
    visits: getCorrelation({ tweets, x, y:'visits' }),
    clicks: getCorrelation({ tweets, x, y:'clicks' }),
    replies: getCorrelation({ tweets, x, y:'replies' }),
    retweets: getCorrelation({ tweets, x, y:'retweets' }),
    impressions: getCorrelation({ tweets, x, y:'impressions' }),
    engagements: getCorrelation({ tweets, x, y:'engagements' })
})

const getOutputCorrelations = (tweets:iLabeledTweet[]):iOutputCorrelations => ({
    likes: getSingleCorrelation({ tweets, x:'likes' }),
    replies: getSingleCorrelation({ tweets, x:'replies' }),
    retweets: getSingleCorrelation({ tweets, x:'retweets' }),
    visits: getSingleCorrelation({ tweets, x:'visits' }),
    clicks: getSingleCorrelation({ tweets, x:'clicks' }),
    impressions: getSingleCorrelation({ tweets, x:'impressions' }),
    engagements: getSingleCorrelation({ tweets, x:'engagements' }),
})

const getFeatureCorrelations = (tweets:iLabeledTweet[]):iInputCorrelations => ({
    followers: getSingleCorrelation({ tweets, x:'followers' }),
    following: getSingleCorrelation({ tweets, x:'following' }),
    isReply: getSingleCorrelation({ tweets, x:'isReply' }),
    hasEmojis: getSingleCorrelation({ tweets, x:'hasEmojis' }),
    emojis: getSingleCorrelation({ tweets, x:'emojis' }),
    characterLength: getSingleCorrelation({ tweets, x:'characterLength' }),
    wordLength: getSingleCorrelation({ tweets, x:'wordLength' }),
    sentenceLength: getSingleCorrelation({ tweets, x:'sentenceLength' }),
    pargagraphLength: getSingleCorrelation({ tweets, x:'pargagraphLength' }),
    hasLineBreaks: getSingleCorrelation({ tweets, x:'hasLineBreaks' }),
    lineBreaks: getSingleCorrelation({ tweets, x:'lineBreaks' }),
    hasMedia: getSingleCorrelation({ tweets, x:'hasMedia' }),
    media: getSingleCorrelation({ tweets, x:'media' }),
    hasLinks: getSingleCorrelation({ tweets, x:'hasLinks' }),
    links: getSingleCorrelation({ tweets, x:'links' }),
    hasHashtags: getSingleCorrelation({ tweets, x:'hasHashtags' }),
    hashtags: getSingleCorrelation({ tweets, x:'hashtags' }),
    hasMentions: getSingleCorrelation({ tweets, x:'hasMentions' }),
    mentions: getSingleCorrelation({ tweets, x:'mentions' }),
    isWeekDay: getSingleCorrelation({ tweets, x:'isWeekDay' }),
    isDaytime: getSingleCorrelation({ tweets, x:'isDaytime' }),
    hoursFromLastTweet: getSingleCorrelation({ tweets, x:'hoursFromLastTweet' }),
    hoursFromLastStatus: getSingleCorrelation({ tweets, x:'hoursFromLastStatus' }),
    lastTweetLikes: getSingleCorrelation({ tweets, x:'lastTweetLikes' }),
    lastTweetVisits: getSingleCorrelation({ tweets, x:'lastTweetVisits' }),
    lastTweetClicks: getSingleCorrelation({ tweets, x:'lastTweetClicks' }),
    lastTweetReplies: getSingleCorrelation({ tweets, x:'lastTweetReplies' }),
    lastTweetRetweets: getSingleCorrelation({ tweets, x:'lastTweetRetweets' }),
    lastTweetImpressions: getSingleCorrelation({ tweets, x:'lastTweetImpressions' }),
})


const averageOutputs = (tweets:iLabeledTweet[]):iCorrelations => ({
    likes: tweets.reduce((d, { likes }) => d += likes, 0)/tweets.length,
    clicks: tweets.reduce((d, { clicks }) => d += clicks, 0)/tweets.length,
    visits: tweets.reduce((d, { visits }) => d += visits, 0)/tweets.length,
    replies: tweets.reduce((d, { replies }) => d += replies, 0)/tweets.length,
    retweets: tweets.reduce((d, { retweets }) => d += retweets, 0)/tweets.length,
    engagements: tweets.reduce((d, { engagements }) => d += engagements, 0)/tweets.length,
    impressions: tweets.reduce((d, { impressions }) => d += impressions, 0)/tweets.length,
})

const dateTimeMatrix = (tweets:iLabeledTweet[]):iDatetimeCorrelations => ({
    days: Array(7).map((_, i) => ({ day:i, correlations: averageOutputs(tweets.filter(({ day }) => day === i )) })),
    hours: Array(24).map((_, i) => ({ hour:i, correlations: averageOutputs(tweets.filter(({ hour }) => hour === i )) }))
})


const getCorrelations = async(tweets:iLabeledTweet[]) => {
    const outputsCorrelationMatrix = getOutputCorrelations(tweets)
    const outputsMatrixData = JSON.stringify(outputsCorrelationMatrix)
    await writeFile('./data/correlations/outputsMartix.json', outputsMatrixData)

    // console.log(outputsCorrelationMatrix)

    const inputsMatrix = getFeatureCorrelations(tweets)
    const inputs = Object.entries(inputsMatrix).map(([feature, correlations]) => ({ feature, correlations }))
    const sortedInputs = inputs.sort(({ correlations:a }, { correlations:b }) => 
        a && b ? a.engagements > b.engagements ? -1 : 1 : -1
    )

    const inputsData = JSON.stringify(sortedInputs)
    await writeFile('./data/correlations/inputsMatrix.json', inputsData)
}


getCorrelations(tweets as iLabeledTweet[]).catch(console.log)
