import * as puppeteer from 'puppeteer';

interface INoAdsResult {
    dataUrl: string;
    domain: string;
    title: string;
    titleHref: string;
}

interface IScrapeResult extends INoAdsResult {
    ads: [boolean | null, boolean | null, boolean | null];
}

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
    return newPage.evaluate((): INoAdsResult[] => {
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
             * Filter out posts that are ads or have nsfw tags, strip out
             * junk properties from valid posts.
             */
            .filter((post: IScrapeResult): boolean => !post.ads.includes(true))
            .map((goodPost: IScrapeResult): INoAdsResult => {
                return {
                    dataUrl: goodPost.dataUrl,
                    domain: goodPost.domain,
                    title: goodPost.title,
                    titleHref: goodPost.titleHref
                };
            });
    });
};

module.exports = redditScraper;
