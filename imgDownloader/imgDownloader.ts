import * as fs from 'fs';
import { ClientRequest } from 'http';
import * as https from 'https';
import { INoAdsResult } from '../dictionary';
import { default as logger } from '../logger/logger';
import { default as timeStamp } from '../timeStamp/timeStamp';

const imgDownloader = async (validatedResults: INoAdsResult[], currentDirectory: string): Promise<void> =>
    /**
     * Loop through our validated, properly named results scraped
     * from reddit.
     */
    validatedResults.forEach(async (post: INoAdsResult): Promise<ClientRequest> | Promise<void>  => {
        /**
         * Filter all results by proper image extension, download accepted file types, close stream.
         */
        const extension: string = post.dataUrl.split('.')[post.dataUrl.split('.').length - 1];
        if (['jpeg', 'jpg', 'png'].includes(extension)) {
            const newFile: fs.WriteStream = await fs.createWriteStream(`${post.title}.${extension}`);
            return https.get(post.dataUrl, (res): fs.WriteStream => {
                res.pipe(newFile);
                return newFile.on('finish', async (): Promise<void> => newFile.close());
            });
        } else {
            return logger(`We're unsure about ${post.dataUrl} -> ${timeStamp()}`, currentDirectory);
        }
    });

export default imgDownloader;