import { iRawTweet, iRawMetrics, iAuth } from '../V.0.0.5/types'
import { getTwitterClients } from '../V.0.0.5/fetch'
import { MongoClient } from 'mongodb'
import { promises as fs } from 'fs'

require('dotenv').config()


interface iUser {
    screen_name:string
    access_token_key:string
    access_token_secret:string
    fetched?:boolean
}

const fetchUser = async({ screen_name, access_token_key, access_token_secret }: iUser) => {
    console.log(`Fetching: ${screen_name} data`)
    const { client, metricsClient } = getTwitterClients({ access_token_key, access_token_secret })

    const bio:iAuth = await client.get('/account/verify_credentials')
    const bioData = JSON.stringify(bio)
    await fs.writeFile(`./data/bios/${screen_name}.json`, bioData)

    const followers = await client.get('/followers/list.json?count=200')
    const followersData = JSON.stringify(followers)
    await fs.writeFile(`./data/followers/${screen_name}.json`, followersData)

    const tweets:iRawTweet[] = await client.get(`/statuses/user_timeline.json?count=200`) 
    const tweetsData = JSON.stringify(tweets)
    await fs.writeFile(`./data/tweets/${screen_name}.json`, tweetsData)

    const noRetweets = tweets.filter(({ retweeted }) => !retweeted)
    if(!noRetweets.length) return

    const ids:string = noRetweets.map(({ id_str }) => id_str).filter((_, idx) => idx < 100).join(',')

    const fields = 'fields=organic_metrics,created_at'
    const metricsUrl = `tweets?ids=${ids}&tweet.${fields}`

    const { data:metrics }:{ data: iRawMetrics[] } = await metricsClient.get(metricsUrl)
    const metricsData = JSON.stringify(metrics)
    await fs.writeFile(`./data/metrics/${screen_name}.json`, metricsData)

    return true
}


const fetchUsers = async() => {
    console.log('Fetching Users')
    const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`

    const client = new MongoClient(uri)
    await client.connect()
    console.log('Connected')

    const db = process.env.subscribers_collection
    const collection = process.env.subscribers_db as string
    const Users = client.db(db).collection(collection)

    const users:iUser[] = await Users.find().toArray()
    console.log(`Total Users: ${users.length}`)

    const names = users.map(({ screen_name:name }) => name)
    const setOfNames = [...new Set(names)]

    const uniqueUsers = setOfNames.map(name => users.find(({ screen_name }) => screen_name === name))
    console.log(`Unique Users: ${uniqueUsers.length}`)

    await client.close()
    return uniqueUsers as iUser[]
}


const fetch = async(users:iUser[], idx:number) => {
    if (idx + 1 === users.length) return

    const user = users[idx]

    try { user.fetched = await fetchUser(user) } 
    catch(e) { console.log(`Error fetching ${user.screen_name} tweets: ${e}`) }

    fetch(users, idx + 1)
}


const index = async() => {
    const users = await fetchUsers()
    await fetch(users, 0)

    const usersData = JSON.stringify(users)
    await fs.writeFile(`./data/users.json`, usersData)
}

index().catch()
