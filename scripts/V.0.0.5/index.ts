import { sendEmail, writeJSON } from './utils'
import { aggregateData } from './aggregate'
import { analyzeData } from './analysis'
import { fetchData } from './fetch'
import { promises as fs } from 'fs'


const sendNewsletter = async() => {
    const fetchedData = await fetchData()
    const { tweets, followers } = await analyzeData(fetchedData)
    const emailData = aggregateData({...fetchedData, tweets, followers })

    writeJSON()
    sendEmail()
}

const fetchedFile = './data/fetched.json'
const analysisFile = './data/analysis.json'
const aggregatedFile = './data/aggregate.json'

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


aggregate().catch(console.log)
