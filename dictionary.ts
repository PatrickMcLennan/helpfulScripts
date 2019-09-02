/**
 * tsscraper
 */

export interface INoAdsResult {
    dataUrl: string;
    domain: string;
    directory: string;
    title: string;
    titleHref: string;
}

export interface IScrapeResult extends INoAdsResult {
    ads: [boolean | null, boolean | null, boolean | null];
}

/**
 * youtubeChannel
 */
export interface IYoutubeResult {
    channel: string;
    title: string;
    url: string;
}