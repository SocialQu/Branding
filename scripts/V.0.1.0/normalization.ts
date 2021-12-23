import { createObjectCsvWriter as csvWriter } from 'csv-writer'
import { ObjectHeaderItem } from 'csv-writer/src/lib/record'


const path = './data/tweets.csv'
const header:ObjectHeaderItem[] = [
    // Features
    { id:'day', title:'DAY' },
    { id:'hour', title:'HOUR' },
    { id:'media', title:'MEDIA' },
    { id:'links', title:'LINKS' },
    { id:'emojis', title:'EMOJIS' },
    { id:'lenght', title:'LENGTH' },
    { id:'hashtags', title:'HASHTAGS' },
    { id:'mentions', title:'MENTIONS' },
    { id:'followers', title:'FOLLOWERS' },
    { id:'following', title:'FOLLOWING' },
    { id:'linebreaks', title:'LINEBREAKS' },

    // Word Embeddings
    { id:'we1', title:'WE_1' },
    { id:'we2', title:'WE_2' },
    { id:'we3', title:'WE_3' },
    { id:'we4', title:'WE_4' },
    { id:'we5', title:'WE_5' },
    { id:'we6', title:'WE_6' },
    { id:'we7', title:'WE_7' },
    { id:'we8', title:'WE_8' },
    { id:'we9', title:'WE_9' },
    { id:'we10', title:'WE_10' },
    { id:'we11', title:'WE_11' },
    { id:'we12', title:'WE_12' },
]


interface iRecords {
    day: number
    hour: number
    media: number
    links: number
    emojis: number
    lenght: number
    hashtags: number
    mentions: number
    followers: number
    following: number
    linebreaks: number

    we1: number
    we2: number
    we3: number
    we4: number
    we5: number
    we6: number
    we7: number
    we8: number
    we9: number
    we10: number
    we11: number
    we12: number
}

const records:iRecords[] = []

const csv = csvWriter({ path, header })
csv.writeRecords(records).then(console.log)
