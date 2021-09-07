# NLP Analytics for Twitter

For the last two years, I've been blogging about tech, startups & AI.
Some stories have made the front cover of Medium others had barely achieved 20+ views.

It has always puzzled me what creates good copywrite.
Although correlated, the success of a story is largely independent to the hours invested in writing or distribution.

In blogging, success largely depends on two factors: SEO & reader engagement.
However, both are hard to predict, 


Last year, I started twitting.
The short and casual nature of content cautivated.

But the issue persisted: what creates a good Tweet?

I'm a very analytic person, and I love looking at stats, dashboards and data to guide my decisions.
But as a writer I've found that there is little information that I can use to improve my writing.
Href, produces some clues but is not enough
And I've never encountered a platform to A/B test headlines.
So I set on goal to create a dashboard that goes further that the traditional engagement metrics.


### Topic Classification

![Topic Classification](https://raw.githubusercontent.com/SocialQu/Branding/a20575618d0f9ede2d03b4e0eb96b8f1cb3bc1df/static/Topic%20Analysis.png)

The first feature you'll see are your tweets classified by topics. 
In a single charts you can see what you are tweeting about, 
and what type of engagement is creating.

Interestingly, the same can be done with your follower's bios.
By knowing who your audience is you can adapt your message.
I was impressed by how many recent followers I have interested in Product Management.
I've also never thought of tweeting with humor, is a vertical I might explore.
On the other side, I might be tweeting too much about Javascript :joy:


## Engagement Map

![Engagement Map](https://raw.githubusercontent.com/SocialQu/Branding/a20575618d0f9ede2d03b4e0eb96b8f1cb3bc1df/static/Engagement%20Map.png)

This is my favorite feature, it's based on a previous story I wrote: How to visualize human language.
Using word embeddings and PCA, I was able to reduce the dimensionality of a tweet's meaning in a single chart.
Each dot (or bubble) represents a tweet, the x & y dimensions are arbitary, 
but the closer they are the closer its meaning. The size of the bubble represents it's engagement.

Using the map I was able to discover "clusters" of my own tweets:
1. The top left cluster contains questions it has the greatest engagement. 
2. Also at the left, but slightly below are tweets that encourage replies, a few of them were succesful.
3. The tweets at the center are related to personal news, I was surprised too learn people do care about them.
4. There is an irregular cluster that goes from the bottom part of the chart to the right side. 
This is what I call informational tweets, to the right they talk about soft topics as productivity and product
and to the right about technical ones like Software & AI.
This were the least successful of all. 
My goal is now to find a format that allows me to share interesting things I learn in a daily basis.

5. The final cluster at the top right is about promotion of my product. 
I was glad to learn they are not terribly unproductive. 
They are after all a good reason of why I tweet.

You can also find a couple of outliers, but that are really about the failure for the compression algorithm 
For example when asking a question about AI.


## Content Suggestions

![Content Suggestions](https://raw.githubusercontent.com/SocialQu/Branding/a20575618d0f9ede2d03b4e0eb96b8f1cb3bc1df/static/Content%20Suggestions.png)

This last part is the one I need to work more prior to launch.
But you get the idea, using a word cloud I want to know in detail what words are causing good 
engagement and which not. I got it no more talking about the strategy!

My plan is to launch during the middle of September, and I would like to hear what you think.
Also, if you are interested in trying out the Beta next week, please send me a DM.

Thanks for reading,
