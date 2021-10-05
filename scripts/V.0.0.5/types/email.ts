export interface iEmailKpis {
    followers: string
    new_followers: string
    follower_color: string

    engagements: string
    engagements_trend: string
    engagements_color: string

    impressions: string
    impressions_trend: string
    impressions_color: string

    clicks: string
    clicks_trend: string
    clicks_color: string
    
    tweets: string
    tweets_trend: string
    tweets_color: string
    
    replies: string
    replies_trend: string
    replies_color: string
}


export interface iEmailTweets {
    profile_name: string
    profile_handle: string
    profile_link: string
    profile_image: string
    
    best_tweet_text: string
    best_tweet_impressions: string
    best_tweet_retweets: string
    best_tweet_likes: string
    best_tweet_replies: string
    best_tweet_profile_visits: string
    best_tweet_date: string
    best_tweet_link: string

    best_tweet_text_2: string
    best_tweet_impressions_2: string
    best_tweet_retweets_2: string
    best_tweet_likes_2: string
    best_tweet_replies_: string
    best_tweet_profile_visits_2: string
    best_tweet_date_2: string
    best_tweet_link_2: string

    best_tweet_text_3: string
    best_tweet_impressions_3: string
    best_tweet_retweets_3: string
    best_tweet_likes_3: string
    best_tweet_replies_3: string
    best_tweet_profile_visits_3: string
    best_tweet_date_3: string
    best_tweet_link_3: string
}


export interface iEmailTopics {
    topic_name: string
    topic_color: string
    topic_text: string
    topic_tweets: string
    topic_impressions: string
    topic_engagements: string
    topic_width: string

    topic_name_2: string
    topic_color_2: string
    topic_text_2: string
    topic_tweets_2: string
    topic_impressions_2: string
    topic_engagements_2: string
    topic_width_2: string

    topic_name_3: string
    topic_color_3: string
    topic_text_3: string
    topic_tweets_3: string
    topic_impressions_3: string
    topic_engagements_3: string
    topic_width_3: string

    topic_name_4: string
    topic_color_4: string
    topic_text_4: string
    topic_tweets_4: string
    topic_impressions_4: string
    topic_engagements_4: string
    topic_width_4: string

    topic_name_5: string
    topic_color_5: string
    topic_text_5: string
    topic_tweets_5: string
    topic_impressions_5: string
    topic_engagements_5: string
    topic_width_5: string
}


interface iEmailFollowers {
    top_follower_image: string
    top_follower_link: string
    top_follower_name: string
    top_follower_bio: string
    
    first_follower_image: string
    first_follower_name: string
    first_follower_link: string
    first_follower_followers: string
    first_follower_ratio: string
    first_follower_color: string
    first_follower_niche: string
    first_follower_niche_color: string
    first_follower_niche_text: string

    second_follower_image: string
    second_follower_name: string
    second_follower_link: string
    second_follower_followers: string
    second_follower_ratio: string
    second_follower_color: string
    second_follower_niche: string
    second_follower_niche_color: string
    second_follower_niche_text: string

    third_follower_image: string
    third_follower_name: string
    third_follower_link: string
    third_follower_followers: string
    third_follower_ratio: string
    third_follower_color: string
    third_follower_niche: string
    third_follower_niche_color: string
    third_follower_niche_text: string

    fourth_follower_image: string
    fourth_follower_name: string
    fourth_follower_link: string
    fourth_follower_followers: string
    fourth_follower_ratio: string
    fourth_follower_color: string
    fourth_follower_niche: string
    fourth_follower_niche_color: string
    fourth_follower_niche_text: string
}


interface iEmailReplies {
    first_reply_image: string
    first_reply_name: string
    first_reply_link: string
    first_reply_percent: string
    first_reply_impressions: string
    first_reply_engagements: string

    second_reply_image: string
    second_reply_name: string
    second_reply_link: string
    second_reply_percent: string
    second_reply_impressions: string
    second_reply_engagements: string

    third_reply_image: string
    third_reply_name: string
    third_reply_link: string
    third_reply_percent: string
    third_reply_impressions: string
    third_reply_engagements: string

    fourth_reply_image: string
    fourth_reply_name: string
    fourth_reply_link: string
    fourth_reply_percent: string
    fourth_reply_impressions: string
    fourth_reply_engagements: string

    fifth_reply_image: string
    fifth_reply_name: string
    fifth_reply_link: string
    fifth_reply_percent: string
    fifth_reply_impressions: string
    fifth_reply_engagements: string
}


interface iEmailContent {
    editorial_title: string
    editorial: string
    editorial_CTA: string
    editorial_link: string
    editorial_2: string

    content_title: string
    content: string
    content_CTA: string
    content_link: string
    content_2: string
}


interface iEmailFooter {
    cta_link: string
    Sender_City: string
    Sender_State: string
    Sender_Zip: string
    unsubscribe: string
}

export interface iEmailMetrics extends iEmailKpis, iEmailTweets, iEmailTopics, iEmailFollowers, iEmailReplies {}
export interface iEmailData extends iEmailMetrics, iEmailContent, iEmailFooter {}
