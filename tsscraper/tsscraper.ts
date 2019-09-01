import * as puppeteer from 'puppeteer';
import fileNameValidator from '../fileNameValidator/fileNameValidator';

import { INoAdsResult, IScrapeResult } from './../dictionary';

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
    const validPosts: INoAdsResult[] = await newPage.evaluate((): INoAdsResult[] => {
        const posts: Element[] = Array.from(document.querySelectorAll('.thing'));
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
                domain: post.querySelector('span > a').textContent,
                title:
                    post
                        .querySelector('a[data-event-action="title')
                        .textContent
                        .replace('/', '-')
                        .replace(' ', '-')
                        .trim(),
                titleHref: post.querySelector('a').getAttribute('href'),
            };
        })
            /**
             * Filter out posts that contain a truthy within the ads array,
             * these are either ads or nsfw.  Strip out this array from
             * the valid posts + format the name properly.
             */
            .filter((post: IScrapeResult): boolean => !post.ads.includes(true))
            .map((goodPost: IScrapeResult): INoAdsResult => {
                return {
                    dataUrl: goodPost.dataUrl,
                    domain: goodPost.domain,
                    title: fileNameValidator(goodPost.title),
                    titleHref: goodPost.titleHref
                };
            });
    });

    await newPage.close();
    return validPosts;
};

export default redditScraper;