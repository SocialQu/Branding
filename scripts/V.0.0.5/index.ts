// npx ts-node index

import { fetchData, fetchSubscribers } from './fetch'
import { aggregateData } from './aggregate'
import { analyzeData } from './analysis'
import { writeEmail } from './utils'
import { promises as fs } from 'fs'



const fetchedFile = './data/fetched.json'
const analysisFile = './data/analysis.json'
const aggregatedFile = './data/aggregate.json'
const writeFile = './data/write.json'


const fetch = async() => {
    const fetched = await fetchData()
    await fs.writeFile(fetchedFile, JSON.stringify(fetched))
    console.log('Fetched')
}

const classify = async() => {
    const fetched = await fs.readFile(fetchedFile)
    const fetchedJson = JSON.parse(fetched.toString())

    const analysis = await analyzeData(fetchedJson)
    const analysisJson = JSON.stringify(analysis)

    await fs.writeFile(analysisFile, analysisJson)
    console.log('Classified')
}


const aggregate = async() => {
    const analysis = await fs.readFile(analysisFile)
    const analysisJson = JSON.parse(analysis.toString())

    const aggregatedData = aggregateData(analysisJson)
    const aggregatedJson = JSON.stringify(aggregatedData)

    await fs.writeFile(aggregatedFile, aggregatedJson)
    console.log('Aggregated')
}


const write = async() => {
    const aggregated = await fs.readFile(aggregatedFile)
    const aggregatedJson = JSON.parse(aggregated.toString())

    const writeData = writeEmail(aggregatedJson)
    const writeJson = JSON.stringify(writeData)

    await fs.writeFile(writeFile, writeJson)
    console.log('Wrote')
}


const index = async() => {
    // await fetch().catch(console.log)
    // await classify().catch(console.log)

    await aggregate().catch(console.log)
    await write().catch(console.log)
}


// index().catch(console.log)
fetchSubscribers().catch(console.log)
