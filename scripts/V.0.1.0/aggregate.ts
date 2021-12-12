import { readFile, writeFile } from 'fs/promises'
import fileHound  from 'filehound'


const read = async(path:string) => {
    console.log(path)
    const data = await readFile(path)
    const text = data.toString()
    const tweets = await JSON.parse(text)
    return tweets
}

const recurse = async(data:any[], files:string[], idx:number) => {
    if(idx + 1 === files.length) return await writeFile('./data/tweets.ts', JSON.stringify(data))

    const file = files[idx]
    const newData = await read(file)

    await recurse([...data, ...newData], files, idx + 1)
}

const aggregate = async() => {
    const tweetFiles = await fileHound.create().paths('./data/tweets').ext('json').find()
    const metricFiles = await fileHound.create().paths('./data/metrics').ext('json').find()

    console.log(tweetFiles, tweetFiles.length)
    console.log(metricFiles, metricFiles.length)

    // await recurse([], files, 0)
}


aggregate().catch()
