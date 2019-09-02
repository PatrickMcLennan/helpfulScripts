const youtubeChannel = require('./youtubeChannel/youtubeChannel').default;
const youtubeDl = require('./youtubeDl/youtubeDl').default;
const path = require('path');

const HERE = path.resolve();

// youtubeChannel().then(results => console.log(results)).catch(err => console.error(err)) 
youtubeDl().then(results => console.log(results)).catch(err => console.error(err)) 