import { iAuth, iRawFollower, iRawMetrics, iRawTweet } from './types/rawData'
import { iAggregatedTweet, iAggregatedUser } from './types/aggregated'
import { readFile, writeFile } from 'fs/promises'
import fileHound  from 'filehound'


const readData = async(path:string) => {
    console.log(path)

    const metricsBuffer = await readFile(path)
    const metricsData = metricsBuffer.toString()
    const metrics:iRawMetrics[] = await JSON.parse(metricsData)

    const tweetsPath = path.replace('metrics', 'tweets')
    const tweetsBuffer = await readFile(tweetsPath)
    const tweetsData = tweetsBuffer.toString()
    const tweets:iRawTweet[] = await JSON.parse(tweetsData)

    const followersPath = path.replace('metrics', 'followers')
    const followersBuffer = await readFile(followersPath)
    const followersData = followersBuffer.toString()
    const followers:iRawFollower[] = await JSON.parse(followersData)

    const profilePath = path.replace('metrics', 'bios')
    const profileBuffer = await readFile(profilePath)
    const profileData = profileBuffer.toString()
    const profile:iAuth = await JSON.parse(profileData)

    return { metrics, tweets, followers, profile }
}


interface iAggreagateData {
    profile: iAuth
    tweets: iRawTweet[]
    metrics: iRawMetrics[]
    followers: iRawFollower[]
}

const aggreagateData = ({ profile, tweets, metrics }:iAggreagateData):iAggregatedUser => {
    const findTweet = (id:string) => tweets.find(({ id_str }) => id_str === id) as iRawTweet
    const metricTweets = metrics.map(metrics => ({ metrics, tweet:findTweet(metrics.id)}))

    const aggregatedTweets:iAggregatedTweet[] = metricTweets.map(({ metrics, tweet }) => ({
        text: metrics.text,
        datetime: new Date(metrics.created_at),
        isReply:!!tweet.in_reply_to_screen_name,
        metrics:{
            likes:metrics.organic_metrics.like_count,
            replies:metrics.organic_metrics.reply_count,
            retweets:metrics.organic_metrics.retweet_count,
            impressions:metrics.organic_metrics.impression_count,
            visits:metrics.organic_metrics.user_profile_clicks,
            clicks:metrics.organic_metrics.url_link_clicks || 0
        },
        entities:{
            mentions: tweet.entities.user_mentions.map(({ screen_name }) => screen_name),
            hashtags: tweet.entities.hashtags.map(({ text }) => text),
            media: tweet.entities.media?.map(({ media_url }) => media_url) || [],
            links: tweet.entities.urls.map(({ expanded_url }) => expanded_url)
        }
    }))

    return {
        name: profile.screen_name,
        followers: profile.followers_count,
        following: profile.friends_count,
        tweets: aggregatedTweets
    }
}

const aggregateUser = async(path:string) => {
    const data = await readData(path)
    const aggreagated = aggreagateData(data)

    const aggreagatedPath = path.replace('metrics', 'aggregated')
    const writeData = JSON.stringify(aggreagated)
    await writeFile(aggreagatedPath, writeData)
}


const recurse = async(files:string[], idx:number) => {
    if(!files.length) return

    const file = files[idx]
    await aggregateUser(file)

    if(idx + 1 === files.length) return
    await recurse(files, idx + 1)
}

const aggregate = async() => {
    const files = await fileHound.create().paths('./data/metrics').ext('json').find()
    await recurse(files, 0)
}


aggregate().catch()
