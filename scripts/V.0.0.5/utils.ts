import { iEmailKpis, iEmailTweets, iEmailTopics, iEmailMetrics } from './types/email'
import { iData } from './types/data'


const formatNumber = (value:number):string => String(value)
const formatDate = (date:Date):string => String(date)

export const buildEmailMetrics = ({ kpis, bestTweets, topics }:iData):iEmailMetrics => {
    const { followers, engagements, impressions, clicks, tweets, replies } = kpis
    const { profile, tweets:[tweet1, tweet2, tweet3] } = bestTweets
    const [ topic1, topic2, topic3, topic4, topic5 ] = topics

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

    const emailTopics: iEmailTopics = {
        topic_name: topic1.name,
        topic_color: topic1.color,
        topic_text: topic1.text,
        topic_tweets: formatNumber(topic1.tweets),
        topic_impressions: formatNumber(topic1.impressions),
        topic_engagements: formatNumber(topic1.engagements),
        topic_width: formatNumber(topic1.width),

        topic_name_2: topic2.name,
        topic_color_2: topic2.color,
        topic_text_2: topic2.text,
        topic_tweets_2: formatNumber(topic2.tweets),
        topic_impressions_2: formatNumber(topic2.impressions),
        topic_engagements_2: formatNumber(topic2.engagements),
        topic_width_2: formatNumber(topic2.width),

        topic_name_3: topic3.name,
        topic_color_3: topic3.color,
        topic_text_3: topic3.text,
        topic_tweets_3: formatNumber(topic3.tweets),
        topic_impressions_3: formatNumber(topic3.impressions),
        topic_engagements_3: formatNumber(topic3.engagements),
        topic_width_3: formatNumber(topic3.width),

        topic_name_4: topic4.name,
        topic_color_4: topic4.color,
        topic_text_4: topic4.text,
        topic_tweets_4: formatNumber(topic4.tweets),
        topic_impressions_4: formatNumber(topic4.impressions),
        topic_engagements_4: formatNumber(topic4.engagements),
        topic_width_4: formatNumber(topic4.width),

        topic_name_5: topic5.name,
        topic_color_5: topic5.color,
        topic_text_5: topic5.text,
        topic_tweets_5: formatNumber(topic5.tweets),
        topic_impressions_5: formatNumber(topic5.impressions),
        topic_engagements_5: formatNumber(topic5.engagements),
        topic_width_5: formatNumber(topic5.width),
    }
}

export const writeJSON = () => {}
export const sendEmail = () => {}
