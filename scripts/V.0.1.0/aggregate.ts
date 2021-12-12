import { iRawMetrics, iRawTweet } from '../V.0.0.5/types'
import { readFile, writeFile } from 'fs/promises'
import fileHound  from 'filehound'


const read = async(path:string) => {
    console.log(path)

    const metricsBuffer = await readFile(path)
    const metricsData = metricsBuffer.toString()
    const metrics:iRawMetrics[] = await JSON.parse(metricsData)

    const tweetsPath = path.replace('metrics', 'tweets')
    const tweetsBuffer = await readFile(tweetsPath)
    const tweetsData = tweetsBuffer.toString()
    const tweets:iRawTweet[] = await JSON.parse(tweetsData)

    return metrics
}

const recurse = async(data:any[], files:string[], idx:number) => {
    if(idx + 1 === files.length) return await writeFile('./data/tweets.ts', JSON.stringify(data))

    const file = files[idx]
    const newData = await read(file)

    await recurse([...data, ...newData], files, idx + 1)
}

const aggregate = async() => {
    const metricFiles = await fileHound.create().paths('./data/metrics').ext('json').find()
    console.log('MetricFiles: ', metricFiles.length)

    // await recurse([], files, 0)
}


aggregate().catch()
