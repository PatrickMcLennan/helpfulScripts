import * as dotenv from 'dotenv';
import * as puppeteer from 'puppeteer';
import { ITorrent } from '../dictionary';
dotenv.config();

const pirateBayPage = async (userName: string): Promise<ITorrent[]> => {
	const URL: string = `https://thepiratebay.org/user/${userName}`;
	const newBrowser: puppeteer.Browser = await puppeteer.launch({ headless: true });
	const newPage: puppeteer.Page = await newBrowser.newPage();
	await newPage.goto(URL, { waitUntil: 'networkidle0', timeout: 0 });
	/**
	 * Loop over all table rows
	 */
	const videoResults: ITorrent[] = await newPage.evaluate((): ITorrent[] => {
		/**
		 * First row is a header, last is pagination - cut both out.
		 * This bug hunt really sucked.
		 */
		const allRows = [...document.querySelectorAll('tr')].slice(1, [...document.querySelectorAll('tr')].length - 2);

		return allRows.map(
			(singleResult: HTMLTableRowElement): ITorrent => {
				return {
					magnet: singleResult
						.querySelector('td a[title="Download this torrent using magnet"]')
						.getAttribute('href'),
					stats: [
						...singleResult
							.querySelector('td .detDesc')
							.textContent.trim()
							.split(',')
					],
					tags: [...singleResult.querySelectorAll('.vertTh center a')].map(
						(aElement: HTMLAnchorElement): string => aElement.textContent
					),
					title: singleResult.querySelector('.detLink').textContent,
					url: `https://thepiratebay.org${singleResult.querySelector('.detLink').getAttribute('href')}`
				};
			}
		);
	});

	await newBrowser.close();
	return videoResults;
};

export default pirateBayPage;
