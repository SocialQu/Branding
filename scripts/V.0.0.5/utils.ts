import { iEmailEditorial, iEmailContent, iEmailFooter, iEmailData, iEmailMetrics } from './types/email'
import { iEmailKpis, iEmailTweets, iEmailTopics, iEmailFollowers, iEmailReplies } from './types/email'
import {  } from './types/email'
import { iData } from './types/data'


const formatNumber = (value:number|undefined):string => {
    if(value === undefined) return `-`

    if (value > 10**6) return `${Math.round(value/10**5)/10}M`
    if (value > 10**4) return `${Math.round(value/100)/10}K`
    if (value > 10**3) return `${value.toLocaleString()}`

    return `${value}`
}


const formatDate = (date:Date):string => String(date)


const buildEmail = ({ kpis, bestTweets, topics, followers, replies }:iData):iEmailMetrics => {
    const { followers:followersKpi, engagements, impressions, clicks, tweets, replies:repliesKpis } = kpis
    const { profile, tweets:[tweet1, tweet2, tweet3] } = bestTweets
    const [ topic1, topic2, topic3, topic4, topic5 ] = topics
    const { topFollower, followers:[ follower1, follower2, follower3, follower4 ] } = followers
    const [ reply1, reply2, reply3, reply4, reply5 ] = replies

    const emailKpis: iEmailKpis = {
        followers: formatNumber(followersKpi.value),
        new_followers: formatNumber(followersKpi.trend),
        follower_color: followersKpi.color,

        engagements: formatNumber(engagements.value),
        engagements_trend: `${formatNumber(engagements.trend)}%`,
        engagements_color: engagements.color,

        impressions: formatNumber(impressions.value),
        impressions_trend: `${formatNumber(impressions.trend)}%`,
        impressions_color: impressions.color,

        clicks: formatNumber(clicks.value),
        clicks_trend: `${formatNumber(clicks.trend)}%`,
        clicks_color: clicks.color,

        tweets: formatNumber(tweets.value),
        tweets_trend: `${formatNumber(tweets.trend)}%`,
        tweets_color: tweets.color,

        replies: formatNumber(repliesKpis.value),
        replies_trend: `${formatNumber(repliesKpis.trend)}%`,
        replies_color: repliesKpis.color
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

    const emailFollowers:iEmailFollowers = {
        top_follower_image: topFollower.image,
        top_follower_link: topFollower.link,
        top_follower_name: topFollower.name,
        top_follower_bio: topFollower.bio,
        
        first_follower_image: follower1.image,
        first_follower_name: follower1.name,
        first_follower_link: follower1.link,
        first_follower_color: follower1.ratioColor,
        first_follower_followers: formatNumber(follower1.followers),
        first_follower_ratio: formatNumber(follower1.ratio),
        first_follower_niche: follower1.niche,
        first_follower_niche_color: follower1.color,
        first_follower_niche_text: follower1.textColor,

        second_follower_image: follower2.image,
        second_follower_name: follower2.name,
        second_follower_link: follower2.link,
        second_follower_color: follower2.ratioColor,
        second_follower_followers: formatNumber(follower2.followers),
        second_follower_ratio: formatNumber(follower2.ratio),
        second_follower_niche: follower2.niche,
        second_follower_niche_color: follower2.color,
        second_follower_niche_text: follower2.textColor,

        third_follower_image: follower3.image,
        third_follower_name: follower3.name,
        third_follower_link: follower3.link,
        third_follower_color: follower3.ratioColor,
        third_follower_followers: formatNumber(follower3.followers),
        third_follower_ratio: formatNumber(follower3.ratio),
        third_follower_niche: follower3.niche,
        third_follower_niche_color: follower3.color,
        third_follower_niche_text: follower3.textColor,

        fourth_follower_image: follower4.image,
        fourth_follower_name: follower4.name,
        fourth_follower_link: follower4.link,
        fourth_follower_color: follower4.ratioColor,
        fourth_follower_followers: formatNumber(follower4.followers),
        fourth_follower_ratio: formatNumber(follower4.ratio),
        fourth_follower_niche: follower4.niche,
        fourth_follower_niche_color: follower4.color,
        fourth_follower_niche_text: follower4.textColor,
    }

    const emailReplies:iEmailReplies = {
        first_reply_image: reply1.image,
        first_reply_name: reply1.name,
        first_reply_link: reply1.link,
        first_reply_percent: formatNumber(reply1.percent),
        first_reply_impressions: formatNumber(reply1.impressions),
        first_reply_engagements: formatNumber(reply1.engagements),

        second_reply_image: reply2.image,
        second_reply_name: reply2.name,
        second_reply_link: reply2.link,
        second_reply_percent: formatNumber(reply2.percent),
        second_reply_impressions: formatNumber(reply2.impressions),
        second_reply_engagements: formatNumber(reply2.engagements),

        third_reply_image: reply3.image,
        third_reply_name: reply3.name,
        third_reply_link: reply3.link,
        third_reply_percent: formatNumber(reply3.percent),
        third_reply_impressions: formatNumber(reply3.impressions),
        third_reply_engagements: formatNumber(reply3.engagements),

        fourth_reply_image: reply4.image,
        fourth_reply_name: reply4.name,
        fourth_reply_link: reply4.link,
        fourth_reply_percent: formatNumber(reply4.percent),
        fourth_reply_impressions: formatNumber(reply4.impressions),
        fourth_reply_engagements: formatNumber(reply4.engagements),

        fifth_reply_image: reply5.image,
        fifth_reply_name: reply5.name,
        fifth_reply_link: reply5.link,
        fifth_reply_percent: formatNumber(reply5.percent),
        fifth_reply_impressions: formatNumber(reply5.impressions),
        fifth_reply_engagements: formatNumber(reply5.engagements)
    }


    const emailMetrics = {
        ...emailKpis,
        ...emailTweets,
        ...emailTopics,
        ...emailFollowers,
        ...emailReplies
    }

    return emailMetrics
}


const addEditorial = ():iEmailEditorial => ({
    editorial_title:'Your growth routine ',
    editorial:'includes all the daily activities that helps you build an audience over time. It can include creating content, replying to tweets, sending DMs or finding new leads! Do you have a growth routine? ',
    editorial_CTA:'Share it with me.',
    editorial_link:'https://twitter.com/SocialQui',
    editorial_2:'',
    kpi_footer:`Data fetched Sunday at 12:00am PT. Trends computed against the 7-day average values.`
})

const addContent = ():iEmailContent => ({
    content_title:'',
    content:'',
    content_CTA:'',
    content_link:'',
    content_2:''
})

const addFooter = ():iEmailFooter => ({
    cta_link: '',
    Sender_City: '',
    Sender_State: '',
    Sender_Zip: '',
    unsubscribe: ''    
})


const wrapEmail = (metrics:iEmailMetrics):iEmailData => {
    return {
        ...metrics,
        ...addEditorial(),
        ...addContent(),
        ...addFooter()
    }
}

export const writeEmail = (data:iData):iEmailData => {
    const metrics = buildEmail(data)
    const email = wrapEmail(metrics)
    return email    
}
