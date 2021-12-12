type Duple = 1 | 0


interface iLabeledData {
    // Bio
    followers: number
    following: number

    // Reply
    isReply: Duple

    // Length
    characterLength: number
    wordLength: number
    sentenceLength: number

    // Line breaks
    hasLineBreaks: Duple
    lineBreaks: number

    // Media
    hasMedia: Duple
    media: number

    // Links
    hasLinks: Duple
    links: number

    // Hashtags
    hasHashtags: Duple
    hashtags: number

    // Mentions
    hasMentions: Duple
    mentions: number

    // Outputs
    likes: number
    visits: number
    clicks: number
    replies: number
    retweets: number
    impressions: number
}
