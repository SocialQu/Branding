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

const fetch = async() => {
    const fetched = await fetchData()
    await fs.writeFile('./data/fetched.json', JSON.stringify(fetched))
}


fetch().catch(console.log)
