import * as dotenv from 'dotenv';
import * as puppeteer from 'puppeteer';
import { ITorrentVideo } from '../dictionary';
dotenv.config();

const pirateBayVideo = async (userName: string): Promise<ITorrentVideo[]> => {
    const URL: string = `https://thepiratebay.org/user/${userName}`;
    /**
     * Instantiate browser window, navigate to users page
     */
    const newBrowser: puppeteer.Browser = await puppeteer.launch({ headless: true });
    const newPage: puppeteer.Page = await newBrowser.newPage();
    await newPage.goto(URL, { waitUntil: 'networkidle0', timeout: 0 });

    /**
     * Loop over all table rows
     */
    const videoResults: ITorrentVideo[] = await newPage.evaluate((): ITorrentVideo[] => {
        const allResults: HTMLTableElement = document.querySelector('#main-content tbody');

        /**
         * Gather array of all table rows (results).  .map an array out of the tables
         * <a> elements -> if one of them contains the textContent 'E-books', don't
         * return that element.  Otherwise, format valid posts data and return.
         */
        return [...allResults.querySelectorAll('tr')].reduce((validPosts: ITorrentVideo[], currentPost: HTMLTableRowElement): ITorrentVideo[] => [...currentPost.querySelectorAll('vertTh a')].map((aTag: HTMLAnchorElement): string => aTag.textContent).includes('E-books')
            ? validPosts
            : [...validPosts, {
                magnet: currentPost.querySelector('[title~="magnet"]').getAttribute('href'),
                title: currentPost.querySelector('.detName a').textContent,
                url: `https://thepiratebay.org/${currentPost.querySelector('.detName a').getAttribute('href')}`,
            }],
        []);
    });

    await newBrowser.close();
    return videoResults;
}

export default pirateBayVideo;