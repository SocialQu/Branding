interface iLabeledData {
    // bio
    followers: number
    following: number

    // tweet length
    characterLength: number
    wordLength: number
    sentenceLength: number

    // line breaks
    hasLineBreaks: 1 | 0
    lineBreaks: number

    // outputs
    likes: number
    visits: number
    clicks: number
    replies: number
    retweets: number
    impressions: number
}
