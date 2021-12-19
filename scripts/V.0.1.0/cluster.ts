import { kMeansCluster, zScore, mean, standardDeviation } from 'simple-statistics'
import { iReducedTweet } from './types/embeddings'
import tweets from './data/reducedTweets.json'


const getEmbeddingsClusters = (tweets:iReducedTweet[]) => {
    const embeddings = tweets.map(({ reduced }) => reduced)
    const { labels } = kMeansCluster(embeddings, 9)
    return labels    
}

const getZScoreParams = (tweets:iReducedTweet[], metric:keyof iReducedTweet) => {
    const values = tweets.map(t => t[metric] as number)
    return { mean:mean(values), sd:standardDeviation(values) }
}

interface iNormalizedTweets extends iReducedTweet { normalizedMetrics:number[] }
const normalizeMetrics = (tweets:iReducedTweet[]):iNormalizedTweets[] => {
    const likeStats = getZScoreParams(tweets, 'likes')
    const visitStats = getZScoreParams(tweets, 'visits')
    const clickStats = getZScoreParams(tweets, 'clicks')
    const replyStats = getZScoreParams(tweets, 'replies')
    const retweetStats = getZScoreParams(tweets, 'retweets')
    const impressionStats = getZScoreParams(tweets, 'impressions')

    const normalizedTweets = tweets.map(t => ({
        ...t,
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

const getEngagementClusters = (tweets:iNormalizedTweets[]) => {
    const points = tweets.map(({ reduced, normalizedMetrics }) => [...reduced, ...normalizedMetrics])
    const { labels } = kMeansCluster(points, 12)
    return labels
}

const getFeatureClusters = (tweets:iNormalizedTweets[]) => {
    const followerStats = getZScoreParams(tweets, 'followers')
    const followingStats = getZScoreParams(tweets, 'following')
    const mentionStats = getZScoreParams(tweets, 'mentions')
    const emojiStats = getZScoreParams(tweets, 'emojis')
    const linebreakStats = getZScoreParams(tweets, 'lineBreaks')
    const characterLengthStats = getZScoreParams(tweets, 'characterLength')
    const hashtagStats = getZScoreParams(tweets, 'hashtags')
    const mediaStats = getZScoreParams(tweets, 'media')
    const linksStats = getZScoreParams(tweets, 'links')

    const points = tweets.map(({ reduced, normalizedMetrics, ...t }) => [
        ...reduced, 
        ...normalizedMetrics,
        ...[
            t.hour/24,
            t.day/7,
            zScore(t.followers, followerStats.mean, followerStats.sd),
            zScore(t.following, followingStats.mean, followingStats.sd),
            zScore(t.mentions, mentionStats.mean, mentionStats.sd),
            zScore(t.emojis, emojiStats.mean, emojiStats.sd),
            zScore(t.lineBreaks, linebreakStats.mean, linebreakStats.sd),
            zScore(t.characterLength, characterLengthStats.mean, characterLengthStats.sd),
            zScore(t.hashtags, hashtagStats.mean, hashtagStats.sd),
            zScore(t.media, mediaStats.mean, mediaStats.sd),
            zScore(t.links, linksStats.mean, linksStats.sd),
        ],
    ])

}

