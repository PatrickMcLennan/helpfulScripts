const pirateBayVideo = require('./pirateBayVideo/pirateBayVideo.js').default;

pirateBayVideo('metalcore').then(resultsArr => console.log(resultsArr)).catch(err => console.error(err))