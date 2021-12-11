interface iEntity {
    hashtags:any[]
    symbols:any[]
    user_mentions:any[]
    urls:{
        url: string
        expanded_url: string
        display_url: string
        indices: number[]
    }[]
}


interface iUser {
    id: number
    id_str: string
    name: string
    screen_name: string
    location: string
    description: string
    url: string
    entities: any
    protected: boolean
    followers_count: number
    friends_count: number
    listed_count: number
    created_at: string
    favourites_count: number
    utc_offset: any
    time_zone: any
    geo_enabled: boolean
    verified: boolean
    statuses_count: number
    lang: any
    contributors_enabled: boolean
    is_translator: boolean
    is_translation_enabled: boolean
    profile_background_color: string
    profile_background_image_url: any
    profile_background_image_url_https: any
    profile_background_tile: boolean
    profile_image_url: string
    profile_image_url_https: string
    profile_banner_url: string
    profile_link_color: string
    profile_sidebar_border_color: string
    profile_sidebar_fill_color: string
    profile_text_color: string
    profile_use_background_image: boolean
    has_extended_profile: boolean
    default_profile: boolean
    default_profile_image: boolean
    following: boolean
    follow_request_sent: boolean
    notifications: boolean
    translator_type: string
    withheld_in_countries: any[]
}


interface iRetweet {
    created_at: string
    id: number,
    id_str: string,
    text: string,
    truncated: boolean,
    entities: any,
    source: string | boolean,
    in_reply_to_status_id:number | null
    in_reply_to_status_id_str:string | null
    in_reply_to_user_id:number | null
    in_reply_to_user_id_str:string | null
    in_reply_to_screen_name:string | null
    user: any,
    geo: null,
    coordinates: null,
    place: null,
    contributors: null,
    is_quote_status: boolean,
    retweet_count: number,
    favorite_count: number,
    favorited: boolean,
    retweeted: boolean,
    lang: string
    quoted_status_id?: number,
    quoted_status_id_str?: string,
    quoted_status?: any
    possibly_sensitive?:boolean
}


export interface iRawTweet {
    created_at:string
    id:number
    id_str:string
    text:string
    truncated:boolean
    entities:iEntity
    source:string
    in_reply_to_status_id:number | null
    in_reply_to_status_id_str:string | null
    in_reply_to_user_id:number | null
    in_reply_to_user_id_str:string | null
    in_reply_to_screen_name:string | null
    user:iUser  
    geo: any
    coordinates: any
    place: any
    contributors: any
    is_quote_status: boolean
    retweet_count: number
    favorite_count: number
    favorited: boolean
    retweeted: boolean
    lang: string
    possibly_sensitive?:boolean
    retweeted_status?:iRetweet
    quoted_status_id?: number,
    quoted_status_id_str?: string,
    quoted_status?: any
}
