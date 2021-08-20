# Implementation

## KPIs
1. [X] Fetch the data from Twitter.
2. [X] Arrange the data in seven day interval arrays.
3. [X] Develop linear correlation helper function.
4. [X] Compute the trend for each KPI.
5. [ ] Overwrite the kpi to the DB.

## Engagement Bubble
1. [X] Tweet data and metrics is reused form initial fetch.
2. [X] Text is transformed into sentence embeddings.
3. [X] Topics are fetched and fed as input.
4. [X] The closest topic for each tweet is selected.
5. [ ] The tweet object is assembled and stored.

## Topic & Audience Bars
1. [X] Get the tweets, stats and topics.
2. [X] Group tweets by topics and store on DB.
3. [X] Fetch recent followers, their stats, and bios.
4. [X] Embed and classify bios by topic.
5. [ ] Aggregate data by topic and audience.

## Top Tweets Break Down
1. [X] Get top 10 tweets by engagement.
2. [X] Compute the distance from the tweet embeddings to each topic.
3. [X] Normalize the total distance to each topic.
4. [ ] Select top 5 topics and store.

## Link Clicks Analysis
1. [X] Filter out links from tweets.
2. [X] Get original URL of the link.
3. [X] Aggregate stats by link.
4. [X] Compute correlation coefficient. 
5. [X] Get the maximum or ideal value for each correlation.
6. [ ] Store values on DB.

## Topic Suggestions
1. [ ] Splits the tweets in 2 categories: above average engament, and below engament.
2. [ ] Sort the tweets and arrange them in both tables.
3. [ ] Compute the center of engament with clustering.
4. [ ] Find the 2 or 3 topics that does not contain tweets and suggest them.
5. [ ] Store results on DB.