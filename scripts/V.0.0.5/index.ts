// npx ts-node index

import { aggregateData } from './aggregate'
import { analyzeData } from './analysis'
import { buildEmail } from './utils'
import { fetchData } from './fetch'
import { promises as fs } from 'fs'



const fetchedFile = './data/fetched.json'
const analysisFile = './data/analysis.json'
const aggregatedFile = './data/aggregate.json'
const writeFile = '../../email/write.json'


const fetch = async() => {
    const fetched = await fetchData()
    await fs.writeFile(fetchedFile, JSON.stringify(fetched))
}

const classify = async() => {
    const fetched = await fs.readFile(fetchedFile)
    const fetchedJson = JSON.parse(fetched.toString())

    const analysis = await analyzeData(fetchedJson)
    const analysisJson = JSON.stringify(analysis)

    await fs.writeFile(analysisFile, analysisJson)
}


const aggregate = async() => {
    const analysis = await fs.readFile(analysisFile)
    const analysisJson = JSON.parse(analysis.toString())

    const aggregatedData = aggregateData(analysisJson)
    const aggregatedJson = JSON.stringify(aggregatedData)

    await fs.writeFile(aggregatedFile, aggregatedJson)
}


const write = async() => {
    const aggregated = await fs.readFile(aggregatedFile)
    const aggregatedJson = JSON.parse(aggregated.toString())

    const writeData = buildEmail(aggregatedJson)
    const writeJson = JSON.stringify(writeData)

    await fs.writeFile(writeFile, writeJson)
}


const index = async() => {
    await aggregate().catch(console.log)
    await write().catch(console.log)
}


index().catch(console.log)
