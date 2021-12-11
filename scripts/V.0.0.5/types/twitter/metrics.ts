interface iOrganicMetrics {
    user_profile_clicks: number
    reply_count: number
    impression_count: number
    like_count: number
    retweet_count: number
    url_link_clicks?: number
}

export interface iRawMetrics {
    organic_metrics: iOrganicMetrics
    id: string
    text: string
    created_at: string    
}
