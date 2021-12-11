export interface iRawFollower {
    id: number
    id_str: string
    name: string
    screen_name: string
    location: string
    description: string
    url: string | null
    entities: { url?:any, description?:any }
    protected: boolean
    followers_count: number
    friends_count: number
    listed_count: number
    created_at: string
    favourites_count: number
    utc_offset: null
    time_zone: null
    geo_enabled: boolean
    verified: boolean
    statuses_count: number
    lang: null
    status?: {
        created_at: string
        id: number
        id_str: string
        text: string
        truncated: boolean
        entities: any
        source: string
        in_reply_to_status_id: number | null
        in_reply_to_status_id_str: string | null
        in_reply_to_user_id: number | null
        in_reply_to_user_id_str: string | null
        in_reply_to_screen_name: string | null
        geo: null
        coordinates: null
        place: any
        contributors: null
        is_quote_status: boolean
        retweet_count: number
        favorite_count: number
        favorited: boolean
        retweeted: boolean
        lang: string
        retweeted_status?: any
        possibly_sensitive?: boolean
        quoted_status_id?: number
        quoted_status_id_str?: string
        extended_entities?: any
    },
    contributors_enabled: boolean
    is_translator: boolean
    is_translation_enabled: boolean
    profile_background_color: string
    profile_background_image_url: string | null
    profile_background_image_url_https: string | null
    profile_background_tile: boolean
    profile_image_url: string
    profile_image_url_https: string
    profile_link_color: string
    profile_sidebar_border_color: string
    profile_sidebar_fill_color: string
    profile_text_color: string
    profile_use_background_image: boolean
    has_extended_profile: boolean
    profile_banner_url?:string
    default_profile: boolean
    default_profile_image: boolean
    following: boolean
    live_following: boolean
    follow_request_sent: boolean
    notifications: boolean
    muting: boolean
    blocking: boolean
    blocked_by: boolean
    translator_type: string
    withheld_in_countries?: any
}
