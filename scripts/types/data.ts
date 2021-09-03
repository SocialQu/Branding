import { iTweetBubble } from './build'

export interface iKpis { tweets:number, engagements:number, impressions:number, followers:number }
export interface iContent { topic:string, tweets:number, engagements:number, impressions:number }
export interface iAudience { topic:string, followers:number }
export interface iSuggestion {
    words: { text:string, value:number }[],
    topics: { topic:string, avgEngagement:number }[]
}

export interface iData {
    kpis: iKpis
    content: iContent
    audience: iAudience
    engagementMap: iTweetBubble[]
    suggestions: { positive:iSuggestion, negative:iSuggestion }
}
