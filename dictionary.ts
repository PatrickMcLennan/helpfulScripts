
 /**
  * tsscraper
  */

export interface INoAdsResult {
    dataUrl: string;
    domain: string;
    title: string;
    titleHref: string;
}

export interface IScrapeResult extends INoAdsResult {
    ads: [boolean | null, boolean | null, boolean | null];
}

/**
 * imgScraper
 */