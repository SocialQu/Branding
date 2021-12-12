import { iAuth, iRawFollower, iRawMetrics, iRawTweet } from './types/rawData'
import { iAggregatedUser } from './types/aggregated'
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

const aggreagateData = ({ profile, tweets, metrics, followers }:iAggreagateData):iAggregatedUser => {
    return {
        name:'',
        followers:0,
        following:0,
        tweets:[]
    }
}


const recurse = async(data:any[], files:string[], idx:number) => {
    if(idx + 1 === files.length) return await writeFile('./data/tweets.ts', JSON.stringify(data))

    const file = files[idx]
    const { tweets } = await readData(file)

    await recurse([...data, ...tweets], files, idx + 1)
}

const aggregate = async() => {
    const metricFiles = await fileHound.create().paths('./data/metrics').ext('json').find()
    console.log('MetricFiles: ', metricFiles.length)

    // await recurse([], files, 0)
}


aggregate().catch()
