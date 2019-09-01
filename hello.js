const redditScraper = require('./tsscraper/tsscraper.js');

redditScraper.default('widescreenWallpaper').then(response => {
    console.log(response);
    return process.exit(0);
}).catch(err => {
    console.error(err);
    return process.exit(1);
})