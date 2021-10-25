// npx ts-node index

import { fetchData, fetchSubscribers, subscribersFile, iSubscriber } from './fetch'
import { aggregateData } from './aggregate'
import { analyzeData } from './analysis'
import { writeEmail } from './utils'
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

    const aggregatedData = aggregateData(analysisJson)
    const aggregatedJson = JSON.stringify(aggregatedData)

    await fs.writeFile(aggregatedFile, aggregatedJson)
    console.log('Aggregated')
}


const write = async({ screen_name }:iSubscriber) => {
    const aggregated = await fs.readFile(aggregatedFile)
    const aggregatedJson = JSON.parse(aggregated.toString())

    const writeData = writeEmail(aggregatedJson)
    const writeJson = JSON.stringify(writeData)

    const writeFile = `./data/emails/${screen_name}.json`
    await fs.writeFile(writeFile, writeJson)
    console.log('Wrote')
}


interface iSteps { fetch:boolean, write:boolean }
const index = async(user:string, steps:iSteps) => {
    // fetchSubscribers().catch(console.log)

    const fetched = await fs.readFile(subscribersFile)
    const subscribers:iSubscriber[] = JSON.parse(fetched.toString())
    const subscriber = subscribers.find(({ screen_name }) => screen_name === user)
    if(!subscriber) return

    if(steps.fetch) await fetch(subscriber).catch(console.log)
    if(steps.fetch) await classify().catch(console.log)

    await aggregate().catch(console.log)
    if(steps.write) await write(subscriber).catch(console.log)
}


index('SocialQui', {fetch:true, write:false}).catch(console.log)
