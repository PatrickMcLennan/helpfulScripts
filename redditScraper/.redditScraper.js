const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const here = path.resolve();

const ARG_COUNT = process.argv.length;
const SUB = process.argv[2];
const DIR = process.argv[3];
const URL = `https://old.reddit.com/r/${SUB}/`;

const reddit = {
	browser: null,
	page: null,

	getImages: async images => {
		console.log(
			`${
				images.length
			} pictures found that aren't duplicates, beginning to fetch them now...`
		);
	},

	checkSystem: images => {
		console.log(
			`${
				images.length
			} posts were found on r/${SUB}, checking for duplicates within ${DIR} right now...`
		);
		fs.readdir(DIR, (err, files) => {
			if (err) {
				console.error(err);
			} else {
				const notDuplicates = images.filter(
					image => !files.includes(image.title)
				);
				return reddit.getImages(notDuplicates);
			}
		});
	},

	parse: async rawPage => {
		const parsedImages = await rawPage.evaluate(() => {
			const posts = Array.from(document.querySelectorAll('.thing'));
			return posts.map(post => {
				return {
					title: post.querySelector('a[data-event-action="title"]')
						.textContent,
					href: post.querySelector('a').getAttribute('href'),
					domain: post.querySelector('span > a').textContent,
					ads: [
						post.querySelector('.stickied-tagline') ? true : null,
						post.querySelector('.promoted-span') ? true : null
					]
				};
			});
		});
		return await parsedImages;
	},

	initialize: async () => {
		reddit.browser = await puppeteer.launch({ headless: true });
		reddit.page = await reddit.browser.newPage();
		await reddit.page.goto(URL, { waitUntil: 'networkidle0' });
		console.log(`Reddit reached, beginning to parse r/${SUB}...`);
		const rawImages = await reddit.parse(reddit.page);
		const images = rawImages.filter(image => !image.ads.includes(true));
		return reddit.checkSystem(images);
	}
};

if (ARG_COUNT < 2) {
	console.log(`
        -------------------------------------------------
        You must enter 2 arguments into this script.
        -------------------------------------------------
    `);
} else if (ARG_COUNT === 3 || ARG_COUNT === 4) {
	reddit.initialize();
} else {
	console.log(`
    -----------------------------------------------------
    You can only enter 1 or 2 arguments into this script.
    -----------------------------------------------------
    `);
}
