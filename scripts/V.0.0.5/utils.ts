import { iEmailKpis, iEmailTweets, iEmailMetrics } from './types/email'
import { iData } from './types/data'


const formatNumber = (value:number):string => String(value)
const formatDate = (date:Date):string => String(date)

export const buildEmailMetrics = ({ kpis, bestTweets }:iData):iEmailMetrics => {
    const { followers, engagements, impressions, clicks, tweets, replies } = kpis
    const { profile, tweets:[tweet1, tweet2, tweet3] } = bestTweets

    const emailKpis: iEmailKpis = {
        followers: formatNumber(followers.value),
        new_followers: formatNumber(followers.trend),
        follower_color: followers.color,

        engagements: formatNumber(engagements.value),
        engagements_trend: formatNumber(engagements.trend),
        engagements_color: engagements.color,

        impressions: formatNumber(impressions.value),
        impressions_trend: formatNumber(impressions.trend),
        impressions_color: impressions.color,

        clicks: formatNumber(clicks.value),
        clicks_trend: formatNumber(clicks.trend),
        clicks_color: clicks.color,

        tweets: formatNumber(tweets.value),
        tweets_trend: formatNumber(tweets.trend),
        tweets_color: tweets.color,

        replies: formatNumber(replies.value),
        replies_trend: formatNumber(replies.trend),
        replies_color: replies.color
    }

    const emailTweets:iEmailTweets = {
        profile_name: profile.name,
        profile_handle: profile.handle,
        profile_link: profile.link,
        profile_image: profile.image,

        best_tweet_text: tweet1.text,
        best_tweet_impressions: formatNumber(tweet1.impressions),
        best_tweet_retweets: formatNumber(tweet1.retweets),
        best_tweet_likes: formatNumber(tweet1.likes),
        best_tweet_replies: formatNumber(tweet1.replies),
        best_tweet_profile_visits: formatNumber(tweet1.profile_visits),
        best_tweet_date: formatDate(tweet1.date),
        best_tweet_link: tweet1.link,

        best_tweet_text_2: tweet2.text,
        best_tweet_impressions_2: formatNumber(tweet2.impressions),
        best_tweet_retweets_2: formatNumber(tweet2.retweets),
        best_tweet_likes_2: formatNumber(tweet2.likes),
        best_tweet_replies_: formatNumber(tweet2.replies),
        best_tweet_profile_visits_2: formatNumber(tweet2.profile_visits),
        best_tweet_date_2: formatDate(tweet2.date),
        best_tweet_link_2: tweet2.link,

        best_tweet_text_3: tweet3.text,
        best_tweet_impressions_3: formatNumber(tweet3.impressions),
        best_tweet_retweets_3: formatNumber(tweet3.retweets),
        best_tweet_likes_3: formatNumber(tweet3.likes),
        best_tweet_replies_3: formatNumber(tweet3.replies),
        best_tweet_profile_visits_3: formatNumber(tweet3.profile_visits),
        best_tweet_date_3: formatDate(tweet3.date),
        best_tweet_link_3: tweet3.link
    }
}

export const writeJSON = () => {}
export const sendEmail = () => {}
