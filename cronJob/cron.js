const fs = require('fs')
const path = require('path')
const https = require('https')

const here = path.resolve();

const now = new Date();

const moveThatBus = () => https.get('https://jsonplaceholder.typicode.com/posts', res => {
    let data = '';

    res.on('data', chunk => data += chunk);

    res.on('end', () => {
        const timeStamp = () => `${now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:${now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()}`
        const dateAdder = string => JSON.stringify(JSON.parse(string).concat([{dateStamp: `This was scraped at ${timeStamp()}`}]))
        fs.writeFile(`${here}/yolo.txt`, dateAdder(data), err =>
            err
                ? console.error(err)
                : console.log(`Successfully ran at ${timeStamp()}`)
        )
        return setTimeout(() => moveThatBus(), 30000)
    }
    )
}).on('error', err => {
    console.error(`ERROR: ${err}`);
    return process.exit(1)
})

moveThatBus()