export interface iKpis { tweets:number, engagements:number, impressions:number, followers:number }
export interface iContent { topic:string, tweets:number, engagements:number, impressions:number }
export interface iAudience { niche:string, followers:number }

interface iLocation { x: number, y: number }
export interface iEngagementLocations {
    tweet: string, 
    topic: string, 
    location: iLocation, 
    engagements: number
}

export interface iSuggestion {
    words: { text:string, value:number }[],
    topics: { topic:string, avgEngagement:number }[]
}

export interface iSuggestions { positive:iSuggestion, negative:iSuggestion }

export interface iData {
    kpis: iKpis
    content: iContent[]
    audience: iAudience[]
    engagementMap: iEngagementLocations[]
    suggestions: iSuggestions
}
