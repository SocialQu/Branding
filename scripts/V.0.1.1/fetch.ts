import { getTwitterClients, iTwitterClients } from '../V.0.0.5/fetch'
import { iRawTweet } from '../V.0.0.5/types'


const fetchTweets = async({ access_token_key, access_token_secret }: iTwitterClients) => {
    const { client, metricsClient } = getTwitterClients({ access_token_key, access_token_secret })
    const rawTweets:iRawTweet[] = await client.get(`/statuses/user_timeline.json?count=100`) 

}
