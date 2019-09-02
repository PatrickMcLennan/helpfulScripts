import * as dotenv from 'dotenv';
import { default as checkDirForDoubles } from '../checkDirForDoubles/checkDirForDoubles';
import { default as imgDownloader } from '../imgDownloader/imgDownloader';
import { default as logger } from '../logger/logger';
import { default as redditTsScraper } from '../redditTsScraper/redditTsScraper';
import { default as timeStamp } from '../timeStamp/timeStamp';
dotenv.config();

import { INoAdsResult } from '../dictionary';
const HERE: string = process.env.BACKGROUNDS_UBUNTU;

process.chdir(HERE);
redditTsScraper(process.env.BACKGROUNDS_REDDIT)
    .then((validatedPosts: INoAdsResult[]): Promise<INoAdsResult[]> => checkDirForDoubles(validatedPosts, HERE))
    .then((newPosts: INoAdsResult[]): Promise<void> => imgDownloader(newPosts, HERE))
    .then((): void => logger(`Successfully ran on ${timeStamp()}`, HERE))
    .catch((err: Error): void => logger(`An error occured on ${timeStamp()}, -> ${err}`, HERE));