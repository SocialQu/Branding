import { kMeansCluster, zScore, mean, standardDeviation } from 'simple-statistics'
import { iClusteredTweet, iReducedTweet } from './types/embeddings'
import tweets from './data/reducedTweets.json'
import { writeFile } from 'fs/promises'


const getZScoreParams = (tweets:iReducedTweet[], metric:keyof iReducedTweet) => {
    const values = tweets.map(t => t[metric] as number)
    return { mean:mean(values), sd:standardDeviation(values) }
}

interface iNormalizedTweet extends iReducedTweet { normalizedMetrics:number[], normalizedFeatures:number[] }
const normalizeTweets = (tweets:iReducedTweet[]):iNormalizedTweet[] => {
    // Features
    const mediaStats = getZScoreParams(tweets, 'media')
    const linksStats = getZScoreParams(tweets, 'links')
    const emojiStats = getZScoreParams(tweets, 'emojis')
    const hashtagStats = getZScoreParams(tweets, 'hashtags')
    const mentionStats = getZScoreParams(tweets, 'mentions')
    const followerStats = getZScoreParams(tweets, 'followers')
    const followingStats = getZScoreParams(tweets, 'following')
    const linebreakStats = getZScoreParams(tweets, 'lineBreaks')
    const characterLengthStats = getZScoreParams(tweets, 'characterLength')

    // Metrics
    const likeStats = getZScoreParams(tweets, 'likes')
    const visitStats = getZScoreParams(tweets, 'visits')
    const clickStats = getZScoreParams(tweets, 'clicks')
    const replyStats = getZScoreParams(tweets, 'replies')
    const retweetStats = getZScoreParams(tweets, 'retweets')
    const impressionStats = getZScoreParams(tweets, 'impressions')

    const normalizedTweets = tweets.map(t => ({
        ...t,
        normalizedFeatures: [
            t.hour/24,
            t.day/7,
            zScore(t.media, mediaStats.mean, mediaStats.sd),
            zScore(t.links, linksStats.mean, linksStats.sd),
            zScore(t.emojis, emojiStats.mean, emojiStats.sd),
            zScore(t.hashtags, hashtagStats.mean, hashtagStats.sd),
            zScore(t.mentions, mentionStats.mean, mentionStats.sd),
            zScore(t.followers, followerStats.mean, followerStats.sd),
            zScore(t.following, followingStats.mean, followingStats.sd),
            zScore(t.lineBreaks, linebreakStats.mean, linebreakStats.sd),
            zScore(t.characterLength, characterLengthStats.mean, characterLengthStats.sd)
        ],

        normalizedMetrics: [
            zScore(t.likes, likeStats.mean, likeStats.sd),
            zScore(t.likes, visitStats.mean, visitStats.sd),
            zScore(t.likes, clickStats.mean, clickStats.sd),
            zScore(t.likes, replyStats.mean, replyStats.sd),
            zScore(t.likes, retweetStats.mean, retweetStats.sd),
            zScore(t.likes, impressionStats.mean, impressionStats.sd),
        ]
    }))

    return normalizedTweets
}


const getEmbeddingsClusters = (tweets:iNormalizedTweet[]) => {
    const embeddings = tweets.map(({ reduced }) => reduced)
    const { labels } = kMeansCluster(embeddings, 9)
    return labels    
}

const getEngagementClusters = (tweets:iNormalizedTweet[]) => {
    const points = tweets.map(({ reduced, normalizedMetrics }) => [...reduced, ...normalizedMetrics])
    const { labels } = kMeansCluster(points, 12)
    return labels
}

const getFeatureClusters = (tweets:iNormalizedTweet[]) => {
    const points = tweets.map(({ reduced, normalizedFeatures }) => [ ...reduced, ...normalizedFeatures ])
    const { labels } = kMeansCluster(points, 15)
    return labels
}

const getClusters = (tweets:iNormalizedTweet[]) => {
    const points = tweets.map(({ reduced, normalizedFeatures }) => [ ...reduced, ...normalizedFeatures ])
    const { labels } = kMeansCluster(points, 20)
    return labels
}


const clusterTweets = (tweets:iReducedTweet[]):iClusteredTweet[] => {
    const normalizedTweets = normalizeTweets(tweets)

    const embeddingsClusters = getEmbeddingsClusters(normalizedTweets)
    const engagementsClusters = getEngagementClusters(normalizedTweets)
    const featureClusters = getFeatureClusters(normalizedTweets)
    const clusters = getClusters(normalizedTweets)

    const clusteredTweets = tweets.map((t, i) => ({
        ...t,
        cluster: clusters[i],
        featuresCluster: featureClusters[i],
        embeddingsCluster: embeddingsClusters[i],
        engagementsCluster: engagementsClusters[i]
    }))

    return clusteredTweets
}


type Cluster = 'embeddingsCluster' | 'featuresCluster' | 'engagementsCluster' | 'cluster'
const analyzeCluster = async(tweets:iClusteredTweet[], cluster:Cluster) => {
    const clusters = tweets.reduce((d, i) => 
        d[i[cluster]] ? {...d, [i[cluster]]:[...d[i[cluster]], i]} : { ...d,[i[cluster]]:[i] }
    , {} as { [cluster:number]: iClusteredTweet[] })

    const avgEngagement = Object.entries(clusters).map(([cluster, tweets]) => ({ 
        cluster, 
        tweets:tweets.length,
        engagement: tweets.reduce((d, { engagements }) => d += engagements , 0)/tweets.length })
    ).sort(({ engagement:a }, { engagement:b }) => a > b ? -1 : 1 )


    const clusteredTweets = tweets.filter(t => t[cluster].toString() === avgEngagement[0].cluster)
    .sort(({ engagements:a }, { engagements:b }) => a > b ? -1 : 1)
    .map(({ followers, text, engagements, ...t }) => ({ cluster:t[cluster], engagements, followers, text }) )

    const data = JSON.stringify({ avgEngagement, clusteredTweets })
    await writeFile(`./data/clusters/${cluster}.json`, data)

    console.log(avgEngagement)
    return avgEngagement
}

const clusterAnalysis = async(tweets:iReducedTweet[]) => {
    const clusteredTweets = clusterTweets(tweets)
    const clusteredData = JSON.stringify(clusteredTweets)

    await writeFile('./data/clusteredTweets.json', clusteredData)

    await analyzeCluster(clusteredTweets, 'embeddingsCluster')
    await analyzeCluster(clusteredTweets, 'featuresCluster')
    await analyzeCluster(clusteredTweets, 'engagementsCluster')
    await analyzeCluster(clusteredTweets, 'cluster')
}


clusterAnalysis(tweets as iReducedTweet[])
