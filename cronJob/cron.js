const fs = require('fs')
const path = require('path')
const https = require('https')
require('dotenv').config()

const HERE = path.resolve()

const moveThatBus = () => https.get('https://jsonplaceholder.typicode.com/posts', res => {
    let data = '';

    res.on('data', chunk => data += chunk)

    return res.on('end', () => 
        fs.writeFile(`${HERE}/yolo.txt`, JSON.stringify([...JSON.parse(data), { timeStamp: 'hello' }]), err =>
            err
                ? console.error(err)
                : console.log('nailed it babaaayyy')
        )
    )
}).on('error', err => console.error(err));

moveThatBus()