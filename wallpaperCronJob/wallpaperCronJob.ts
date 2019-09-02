import * as path from 'path';
import { default as checkDirForDoubles } from '../checkDirForDoubles/checkDirForDoubles';
import { default as imgDownloader } from '../imgDownloader/imgDownloader';
import { default as logger } from '../logger/logger';
import { default as redditTsScraper } from '../redditTsScraper/redditTsScraper';
import { default as timeStamp } from '../timeStamp/timeStamp';

import { INoAdsResult } from '../dictionary';
const HERE: string = '/home/patrick/Pictures/Backgrounds';

redditTsScraper('widescreenWallpaper')
    .then((validatedPosts: INoAdsResult[]): Promise<INoAdsResult[]> => checkDirForDoubles(validatedPosts, HERE))
    .then((newPosts: INoAdsResult[]): Promise<void> => imgDownloader(newPosts))
    .then((): void => logger(`Successfully ran on ${timeStamp()}`, HERE))
    .catch((err: Error): void => logger(`An error occured on ${timeStamp()}, -> ${err}`, HERE));