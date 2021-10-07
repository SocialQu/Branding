import { sendEmail, writeJSON } from './utils'
import { aggregateData } from './aggregate'
import { analyzeData } from './analysis'
import { fetchData } from './fetch'


const sendNewsletter = async() => {
    const fetchedData = await fetchData()
    const { tweets, followers } = await analyzeData(fetchedData)
    const emailData = aggregateData({...fetchedData, tweets, followers })

    writeJSON()
    sendEmail()
}


sendNewsletter()
