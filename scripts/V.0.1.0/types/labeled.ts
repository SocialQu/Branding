type Duple = 1 | 0

interface iLabeledData {
    // bio
    followers: number
    following: number

    // tweet length
    characterLength: number
    wordLength: number
    sentenceLength: number

    // line breaks
    hasLineBreaks: Duple
    lineBreaks: number

    // media
    hasMedia: Duple
    media: number

    // outputs
    likes: number
    visits: number
    clicks: number
    replies: number
    retweets: number
    impressions: number
}
