const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');

const ARG_COUNT = process.argv.length;
const SUB = process.argv[2];
const DIR = process.argv[3];
const URL = `https://old.reddit.com/r/${SUB}/`;

const reddit = {
	browser: null,
	page: null,

	download: async (url, name) => {
		const file = fs.createWriteStream(name);
		const picture = await https.get(url, res => {
			res.pipe(file);
			file.on('finish', async () => await file.close());
		});

		return fs.writeFile(name, await picture, err => {
			if (err) {
				console.error(err);
			} else {
				console.log(`${name.split('/')[name.split('/').length - 1]} was saved.`);
			}
		});
	},

	getImages: async images => {
		console.log(`${images.length} new pictures, beginning to fetch them now...`);

		images.forEach(async image => {
			const browser = await puppeteer.launch({ headless: true });
			const page = await browser.newPage();
			try {
				switch (image.domain) {
					case 'i.redd.it':
						await page.goto(`https://old.reddit.com/${image.href}`, {
							waitUntil: 'networkidle0',
							timeout: 0
						});
						const redditLink = await page.evaluate(() =>
							document.querySelector('div[class="media-preview-content"] > a').getAttribute('href')
						);
						const redditName = `${DIR}/${image.title}.${
							redditLink.split('.')[redditLink.split('.').length - 1]
						}`;
						return await reddit.download(redditLink, redditName);

					case 'imgur.com':
						await page.goto(image.href, { waitUntil: 'networkidle0', timeout: 0 });
						const imgurLink = await page.evaluate(() =>
							document.querySelector('a[class="zoom"]').getAttribute('href')
						);
						const imgurName = `${DIR}/${image.title}.${
							imgurLink.split('.')[imgurLink.split('.').length - 1]
						}`;
						return await reddit.download(`https:${imgurLink}`, imgurName);

					case 'i.imgur.com':
						const iImgurName = `${DIR}/${image.title}.${
							image.href.split('.')[image.href.split('.').length - 1]
						}`;
						return await reddit.download(image.href, iImgurName);

					default:
						console.log(`I don't know how to scrape ${image.domain}.`);
						break;
				}
			} catch (err) {
				console.error(err.message);
			} finally {
				await browser.close();
			}
		});
	},

	checkSystem: images => {
		console.log(`${images.length} posts were found on r/${SUB}, checking for duplicates...`);
		fs.readdir(DIR, (err, files) => {
			if (err) {
				console.error(err);
			} else {
				const trimmedFileNames = files.map(file => file.split('.')[0]);
				const notDuplicates = images.filter(image => !trimmedFileNames.includes(image.title));
				return reddit.getImages(notDuplicates);
			}
		});
	},

	parse: async rawPage => {
		const parsedImages = await rawPage.evaluate(() => {
			const posts = Array.from(document.querySelectorAll('.thing'));
			return posts.map(post => {
				return {
					title: post.querySelector('a[data-event-action="title"]').textContent.replace('/', ' '),
					href: post.querySelector('a').getAttribute('href'),
					domain: post.querySelector('span > a').textContent,
					ads: [
						post.querySelector('.stickied-tagline') ? true : null,
						post.querySelector('.promoted-span') ? true : null
					]
				};
			});
		});
		const images = await parsedImages.filter(image => !image.ads.includes(true));
		return reddit.checkSystem(images);
	},

	initialize: async () => {
		reddit.browser = await puppeteer.launch({ headless: true });
		reddit.page = await reddit.browser.newPage();
		await reddit.page.goto(URL, { waitUntil: 'networkidle0', timeout: 0 });
		return reddit.parse(reddit.page);
	}
};

if (ARG_COUNT !== 4) {
	console.log(`
        --------------------------------------------
        You must enter 2 arguments into this script.
        --------------------------------------------
    `);
} else {
	return reddit.initialize();
}
