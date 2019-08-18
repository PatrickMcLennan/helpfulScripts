const path = require('path');
const { exec } = require('child_process');

const here = path.resolve();

const call = () => exec(`node ../redditScraper/.redditScraper.js widescreenwallpaper ${here}`, err => {
	process.stdout.write('\033c');
    if (err) {
        console.error(err)
    }
    
    process.stdout.write('\033c');
    console.log(
        `Successfully ran at 
            ${new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()}:${new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()}`)
    return setTimeout(() => call(), 1.8e+6)
})

call();