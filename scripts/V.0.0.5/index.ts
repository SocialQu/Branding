import { sendEmail, writeJSON } from './utils'
import { aggregateData } from './aggregate'
import { fetchData } from './fetch'


const sendNewsletter = async() => {
    const fetchedData = await fetchData()
    const emailData = aggregateData(fetchedData)

    writeJSON()
    sendEmail()
}


sendNewsletter()
