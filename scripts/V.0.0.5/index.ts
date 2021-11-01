// npx ts-node index

import { fetchData, fetchSubscribers, subscribersFile, iSubscriber, fetchMentions } from './fetch'
import { writeEmail, sendEmail } from './utils'
import { aggregateData } from './aggregate'
import { analyzeData } from './analysis'
import { iData } from './types/data'
import { promises as fs } from 'fs'



const fetchedFile = './data/fetched.json'
const analysisFile = './data/analysis.json'
const aggregatedFile = './data/aggregate.json'


const fetch = async(subscriber:iSubscriber) => {
    const fetched = await fetchData(subscriber)
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

    const aggregatedData = await aggregateData(analysisJson)
    const aggregatedJson = JSON.stringify(aggregatedData)

    await fs.writeFile(aggregatedFile, aggregatedJson)
    console.log('Aggregated')
}


const write = async() => {
    const aggregated = await fs.readFile(aggregatedFile)
    const aggregatedJson = JSON.parse(aggregated.toString())

    const writeData = writeEmail(aggregatedJson)
    const writeJson = JSON.stringify(writeData)

    const writeFile = `./data/write.json`
    await fs.writeFile(writeFile, writeJson)
    console.log('Wrote')
}


const grabTokens = async(user:string):Promise<iSubscriber> => {
    const fetched = await fs.readFile(subscribersFile)
    const subscribers:iSubscriber[] = JSON.parse(fetched.toString())
    const subscriber = subscribers.find(({ screen_name }) => screen_name === user)
    if(!subscriber) throw Error(`Missing data for ${user}`)

    return subscriber
}

interface iSteps { fetch:boolean, write:boolean, send:boolean }
const debug = async(user:string, steps:iSteps) => {
    // fetchSubscribers().catch(console.log)
    const subscriber = await grabTokens(user)

    if(steps.fetch) await fetch(subscriber).catch(console.log)
    if(steps.fetch) await classify().catch(console.log)

    await aggregate().catch(console.log)
    if(steps.write) await write().catch(console.log)
}

// debug('SocialQui', { fetch:false, write:true }).catch(console.log)


const debugSend = async() => {
    const writeFile = `./data/write.json`
    const writen = await fs.readFile(writeFile)
    const writenJson = JSON.parse(writen.toString())

    await sendEmail(writenJson, 'santiago.aws@gmail.com').catch()
}

// debugSend().catch(console.log)


const getMentionImages = async() => {
    const subscriber = await grabTokens('SocialQui')

    const aggregated = await fs.readFile(aggregatedFile)
    const aggregatedData = JSON.parse(aggregated.toString()) as iData
    const mentions = aggregatedData.replies.map(({ name }) => name)

    const images = await fetchMentions(subscriber, mentions)
    aggregatedData.replies.map(reply => ({ ...reply, image:images[reply.name] }))

    console.log('Replies:', aggregatedData.replies)
}

// getMentionImages().catch(console.log)



interface iUser { twitter:string, email:string }
const index = async({ twitter, email } :iUser, { fetch, write, send }:iSteps) => {
    if(fetch) await fetchSubscribers().catch(console.log)
    const subscriber = await grabTokens(twitter)

    const fetched = await fetchData(subscriber)
    const analysis = await analyzeData(fetched)
    const aggregatedData = await aggregateData(analysis)

    const mentions = aggregatedData.replies.map(({ name }) => name)
    const images = await fetchMentions(subscriber, mentions)
    aggregatedData.replies.map(reply => ({ ...reply, image:images[reply.name] }))

    const writeData = writeEmail(aggregatedData)
    if(send) await sendEmail(writeData, email).catch()

    if(write){
        const writeJson = JSON.stringify(writeData)
        const writeFile = `./data/emails/${subscriber.screen_name}.json`
        await fs.writeFile(writeFile, writeJson)
    }
}

const user:iUser = { twitter:'SocialQui', email:'santiago.aws@gmail.com' }
index(user, { fetch:false, send:true, write:false }).catch(console.log)
