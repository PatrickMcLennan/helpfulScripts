import * as path from 'path';
import * as puppeteer from 'puppeteer';
import { INoAdsResult, IScrapeResult } from '../dictionary';
import { default as fileNameValidator } from '../fileNameValidator/fileNameValidator';

const DIR: string = process.argv[2] || path.resolve();

const redditScraper = async (SUB: string): Promise<INoAdsResult[]> => {
    /**
     * Instantiate scraper, navigate to sub.
     */
    const URL = `https://old.reddit.com/r/${SUB}`;
    const newBrowser: puppeteer.Browser = await puppeteer.launch({ headless: true });
    const newPage: puppeteer.Page = await newBrowser.newPage();
    await newPage.goto(URL, { waitUntil: 'networkidle0', timeout: 0 });
    /**
     * Page is loaded, parse out individual posts.
     */
    const validPosts: INoAdsResult[] = await newPage.evaluate((): IScrapeResult[] => {
        const posts: HTMLDivElement[] = Array.from(document.querySelectorAll('.thing'));
        /**
         * Loop over each scraped post, pull what you want
         */
        return posts.map((post: HTMLDivElement): IScrapeResult => {
            return {
                ads: [
                    post.querySelector('.stickied-tagline') ? true : null,
                    post.querySelector('.promoted-span') ? true : null,
                    post.getAttribute('data-nsfw') !== 'false' ? true : null
                ],
                dataUrl: post.getAttribute('data-url'),
                directory: DIR,
                domain: post.querySelector('span > a').textContent,
                title:
                    post
                        .querySelector('a[data-event-action="title"')
                        .textContent,
                titleHref: post.querySelector('a').getAttribute('href'),
            };
        });
    });
    /**
     * Filter out posts that contain a truthy within the ads array,
     * these are either ads or nsfw.  Strip out this array property from
     * the valid posts + format the name properly.
     */
    const formattedPosts = validPosts.reduce((validResultsArr: INoAdsResult[], potentialResult: IScrapeResult) =>
        !potentialResult.ads.includes(true)
            ? [...validResultsArr, {
                dataUrl: potentialResult.dataUrl,
                directory: DIR,
                domain: potentialResult.domain,
                title: fileNameValidator(potentialResult.title),
                titleHref: potentialResult.titleHref
            }]
            : validResultsArr,
        []);

    await newBrowser.close();
    return formattedPosts;
};

export default redditScraper;