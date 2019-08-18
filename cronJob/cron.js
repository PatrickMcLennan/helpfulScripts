const path = require('path');
const { exec } = require('child_process');

const here = path.resolve();

const now = new Date();
const currentTime = `${now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:${now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()}${now.getHours() > 12 ? 'P.M' : 'A.M'}`

const call = () => exec(`node ../redditScraper/.redditScraper.js widescreenwallpaper ${here}`, err => {
	process.stdout.write('\033c');
    if (err) {
        console.error(err)
    }
    
    process.stdout.write('\033c');
    console.log(`Successfully ran at ${currentTime}`)
    return setTimeout(() => call(), 1.8e+6)
})

call();