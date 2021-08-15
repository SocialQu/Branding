interface iOrganicMetrics {
    user_profile_clicks: number
    reply_count: number
    impression_count: number
    like_count: number
    retweet_count: number
    url_link_clicks?: 0
}

export interface iMetrics {
    organic_metrics: iOrganicMetrics
    id: string
    text: string
    created_at: string    
}
