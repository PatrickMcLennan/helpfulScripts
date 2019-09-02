import * as fs from 'fs';
import { default as logger } from '../logger/logger';

import { INoAdsResult } from '../dictionary';

const directoryChecker = async (objectArr: INoAdsResult[], directory: string): Promise<INoAdsResult[]> => {
    process.chdir(directory);
    let currentFiles: string[] = [];
    /**
     * Gather the names of the files currently in the Directory
     */
    await fs.readdir(directory, (err: Error, files: string[]): INoAdsResult[] | void => {
        if (err) {
                logger(`There was an error checking the directory for duplicates -> ${err}`, directory);
                return process.exit(1);
        } else {
            currentFiles = files;
        }
    });
    /**
     * Return the posts that aren't in the directory
     */
    return objectArr.reduce((newPosts: INoAdsResult[], currentPost: INoAdsResult): INoAdsResult[] =>
        currentFiles.includes(currentPost.title)
            ? newPosts
            : [...newPosts, currentPost],
        []);
};

export default directoryChecker;