# redditTsScraper

(Another) reddit scraper, made in TypeScript. Returns all posts on the first page of any given subreddit, filtered without ads or nsfw content.

```
const scraper = require('path/to/redditTsScraper.js')
```

gives you access the `scraper()` function. `scraper(subReddit)` returns a Promise for an Array of the front pages posts.

```
[{
    dataUrl: string,
    domain: string,
    title: string,
    titleHref: string,
}, { dataUrl: string, ... }]
```

---

`redditTsScraper` requires `puppeteer`.
