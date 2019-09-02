import * as fs from 'fs';
import { ClientRequest } from 'http';
import * as https from 'https';
import { INoAdsResult } from '../dictionary';

const imgDownloader = async (validatedResults: INoAdsResult[]): Promise<void> =>
    /**
     * Loop through our validated, properly named results scraped
     * from reddit.
     */
    validatedResults.forEach(async (post: INoAdsResult): Promise<ClientRequest> | Promise<void> => {
        if (['jpeg', 'jpg', 'png'].includes(`${post.dataUrl.split('.')[post.dataUrl.split('.').length - 1]}`)) {
            const newFile: fs.WriteStream = await fs.createWriteStream(`${post.title}.${post.dataUrl.split('.')[post.dataUrl.split('.').length - 1]}`);
            /**
             * Open a writestream for each, download image, close stream.
             */
            return https.get(post.dataUrl, (res): fs.WriteStream => {
                res.pipe(newFile);
                return newFile.on('finish', async (): Promise<void> => newFile.close());
            });
        }
    });

export default imgDownloader;