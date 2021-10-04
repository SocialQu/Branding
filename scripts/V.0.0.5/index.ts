import { sendEmail, writeJSON } from './utils'
import { aggregateData } from './aggregate'
import { fetchData } from './fetch'


const sendNewsletter = () => {
    fetchData()
    aggregateData()
    writeJSON()
    sendEmail()
}


sendNewsletter()
