const pirateBayPage = require('./pirateBayPage/pirateBayPage.js').default;

pirateBayPage('metalcore').then(resultsArr => console.log(resultsArr)).catch(err => console.error(err))