import { iCompositeTweet, iAggregatedTweets } from './types/aggregated'
import { Duple, iLabeledData } from './types/labeled'
import { readFile, writeFile } from 'fs/promises'
import fileHound  from 'filehound'


const toDuple = (dual:boolean):Duple => dual ? 1 : 0
const getLastTweet = (tweets:iCompositeTweet[], i:number) => tweets.find((t, idx) => !t.isReply && idx > i)

const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi


const labelData = ({ tweets, ...data }: iAggregatedTweets):iLabeledData[] => tweets.map((t, i) => {
    const date = new Date(t.datetime)
    const hours = date.getHours()
    const day = date.getDay()

    const tweet:iLabeledData = {
        followers: data.followers,
        following: data.following,

        isReply: toDuple(t.isReply),

        emojis: (t.text.match(emojiRegex) || []).length,
        hasEmojis: toDuple(!!emojiRegex.test(t.text)),

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

        ...t.metrics
    }

    const lastStatus = tweets[i + 1]
    const lastTweet = getLastTweet(tweets, i)

    if(!lastTweet) return tweet

    tweet.hoursFromLastStatus = (Number(new Date(lastStatus.datetime)) - Number(date))/(1000*60*60)
    tweet.hoursFromLastTweet = (Number(new Date(lastTweet.datetime)) - Number(date))/(1000*60*60)

    tweet.lastTweetLikes = lastTweet.metrics.likes
    tweet.lastTweetReplies = lastTweet.metrics.replies
    tweet.lastTweetClicks = lastTweet.metrics.clicks
    tweet.lastTweetVisits = lastTweet.metrics.visits
    tweet.lastTweetRetweets = lastTweet.metrics.retweets
    tweet.lastTweetImpressions = lastTweet.metrics.impressions

    return tweet
})

const labelFile = async(path:string):Promise<iLabeledData[]> => {
    const buffer = await readFile(path)
    const str = buffer.toString()
    const data:iAggregatedTweets = await JSON.parse(str)

    const tweets = labelData(data)
    return tweets
}

const recurse = async(data:iLabeledData[], files:string[], idx:number):Promise<iLabeledData[]> => {
    if(!files.length) return data

    const file = files[idx]
    const tweets = await labelFile(file)
    console.log(file, tweets.length)

    if(idx + 1 === files.length) return data
    return await recurse([...data, ...tweets], files, idx + 1)
}


const label = async() => {
    const files = await fileHound.create().paths('./data/aggregated').ext('json').find()
    const labeledData = recurse([], files, 0)
    console.log('Labeled Data', (await labeledData).length)

    const writeData = JSON.stringify(labeledData)
    await writeFile('./data/labeledData.json', writeData)
}


label().catch(console.log)
