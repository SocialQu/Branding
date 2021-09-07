For the last two years, I've been [blogging](http://santiagoq.medium.com/) about tech, startups & AI. Some stories have made the front cover of Medium others had barely achieved 20+ views.

It puzzles me what creates good content. Although correlated, the success of a story is largely independent of the hours invested in its writing or distribution. Success largely depends on two factors: SEO & reader engagement. However, both are hard to predict.

Last year, I started tweeting. The short and casual nature of its content captivated me. But the issue persisted: what creates a good Tweet?

I'm a very analytic person, and I love looking at stats, dashboards, and data to guide my decisions. But as a writer, I've found that there is little information that I can use to improve my writing. Ahref produces some clues but is not enough. And I've never encountered a platform to A/B test headlines.

So I set on a goal to create a dashboard that goes further than the traditional engagement metrics.

### Topic Classification

![Topic Classification](https://raw.githubusercontent.com/SocialQu/Branding/a20575618d0f9ede2d03b4e0eb96b8f1cb3bc1df/static/Topic%20Analysis.png)

The first feature you'll see is your tweets classified by topics. In a single chart, you can see what you are tweeting about, and what type of engagement is creating.

Interestingly, the same can be done with your follower's bios. By knowing who your audience is you can adapt your message. I was impressed by how many recent followers I have interested in Product Management. I've also never thought of tweeting with humor, is a vertical I might explore. On the other side, I might be tweeting too much about Javascript 😂


## Engagement Map

![Engagement Map](https://raw.githubusercontent.com/SocialQu/Branding/a20575618d0f9ede2d03b4e0eb96b8f1cb3bc1df/static/Engagement%20Map.png)

This is my favorite feature, it's based on a previous story I wrote: [How to visualize human language](https://medium.com/analytics-vidhya/how-to-visualize-word-embeddings-7ed0fb047089). Using word embeddings and PCA, I was able to reduce the dimensionality of a tweet's meaning in a single chart. Each dot (or bubble) represents a tweet, the x & y dimensions are arbitrary,  but the closer they are the closer its meaning. The size of the bubble represents its engagement.

Using the map I was able to discover "clusters" of my own tweets:
1. The top left cluster contains questions it has the greatest engagement. 
2. Also at the left, but slightly below are tweets that encourage replies, a few of them were successful.
3. The tweets at the center are related to personal news, I was surprised to learn people do care about them.
4. There is an irregular cluster that goes from the bottom part of the chart to the right side. This is what I call informational tweets, to the right they talk about soft topics as productivity and product, and to the right about technical ones like Software & AI. This was the least successful of all. My goal is now to find a format that allows me to share interesting things I learn on a daily basis.
5. The final cluster at the top right is about the promotion of my product. I was glad to learn they are not terribly unproductive. They are after all a good reason why I tweet.

You can also find a couple of outliers, but that is really about the failure of the compression algorithm  For example when asking a question about AI.


## Content Suggestions

![Content Suggestions](https://raw.githubusercontent.com/SocialQu/Branding/a20575618d0f9ede2d03b4e0eb96b8f1cb3bc1df/static/Content%20Suggestions.png)

This last part is the one I need to work on more on prior to launching. But you get the idea, using a word cloud I want to know in detail what words are causing good engagement and which are not. I got it no more talking about the strategy!

My plan is to launch during the middle of September, and I would like to hear what you think. Also, if you are interested in trying out the Beta next week, please send me a [DM](https://twitter.com/SocialQui).

Thanks for reading,
