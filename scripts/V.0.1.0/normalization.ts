import { createObjectCsvWriter as csvWriter } from 'csv-writer'
import { ObjectHeaderItem } from 'csv-writer/src/lib/record'


const path = './data/tweets.csv'
const header:ObjectHeaderItem[] = [
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
    { id:'linebreaks', title:'LINEBREAKS' }
]


const csv = csvWriter({ path, header })
 
// const records = []
// csv.writeRecords(records).then(console.log)
