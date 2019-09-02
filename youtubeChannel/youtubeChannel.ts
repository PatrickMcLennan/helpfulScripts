import * as dotenv from 'dotenv';
import * as puppeteer from 'puppeteer';
dotenv.config();

import { IYoutubeResult } from '../dictionary';

const youtubeChannel = async (): Promise<IYoutubeResult[]> => {
    /**
     * Open new browser instance, navigate to channels page.
     */
    const newBrowser: puppeteer.Browser = await puppeteer.launch({ headless: true });
    const channelPage: puppeteer.Page = await newBrowser.newPage();
    await channelPage.goto(process.env.YOUTUBE_CHANNEL_1, { waitUntil: 'networkidle0', timeout: 0 });

    /**
     * Scrape all video links on page
     */
    const allResults: IYoutubeResult[] = await channelPage.evaluate((): IYoutubeResult[] => {
        const linksWrapper: HTMLElement = document.querySelector('#primary #items');
        const channel: string = document.querySelector('#channel-name #text').textContent;

        return [...Array.from(linksWrapper.querySelectorAll('#dismissable'))].map((singleResult: HTMLElement): IYoutubeResult => {
            return {
                channel,
                title: singleResult.querySelector('#dismissable #video-title').textContent,
                url: `https://youtube.com${singleResult.querySelector('#dismissable #video-title').getAttribute('href')}`,
            };
        });
    });

    await newBrowser.close();
    return allResults;
};

export default youtubeChannel;