# Explore your fediverse hashtags

![A wordcloud showing hashtags I've used in the past, including: fediverse, music, mastodon, socialmedia, poll, bots, newmusic, dataviz, and a lot more.](images/preview.png)

[Explore your most used hashtags](https://data.stefanbohacek.com/projects/fediverse-hashtags)


## Notes for development and testing

### Retrieve and save locally stored data

```js
const data = localStorage.getItem("fediverseHashtags");
copy(data);
// ...
localStorage.setItem("fediverseHashtags", data);
```