import fetchedData from './data/fetched.json'

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
const aggregatedFile = './data/aggregate.json'

const fetch = async() => {
    const fetched = await fetchData()
    await fs.writeFile(fetchedFile, JSON.stringify(fetched))
}

const classify = async() => {
    const analysis = await analyzeData(fetchedData)
    await fs.writeFile(aggregatedFile, JSON.stringify(analysis))
}


classify().catch(console.log)
