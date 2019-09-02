import * as fs from 'fs';
import { default as logger } from '../logger/logger';

import { INoAdsResult } from '../dictionary';

const directoryChecker = async (objectArr: INoAdsResult[], directory: string): Promise<INoAdsResult[]> => {
    /**
     * Get current files in dir
     */
    let currentFiles: string[] = [];
    await fs.readdir(directory, (err: Error, files: string[]): string[] | void => {
        if (err) {
            return logger(`There was an error checking the directory for duplicates -> ${err}`, directory);
        } else {
            return currentFiles = files;
        }
    });
    /**
     * Remove any duplicates from objectArr
     */
    return objectArr.reduce((newPosts: INoAdsResult[], currentPost: INoAdsResult): INoAdsResult[] =>
        currentFiles.includes(currentPost.title)
            ? newPosts
            : [...newPosts, currentPost],
        []);
};

export default directoryChecker;