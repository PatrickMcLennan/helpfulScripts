const https = require('https')
const { google } = require('googleapis')

const gmailCall = () => https.get('https://www.googleapis.com/gmail/v1/users/104846417437943886966/drafts', res => {
    let data = '';

    res.on('data', chunk => data += chunk);

    res.on('end', () => console.log(data))
}).on('error', err => console.error(err));

const caller = google.gmail({
    v: 'v3',
    auth: '...'
});

const auth = new google.auth.GoogleAuth()

gmailCall()