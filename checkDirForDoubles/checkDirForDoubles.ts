import * as fs from 'fs';
import * as path from 'path'

import { INoAdsResult } from '../dictionary';
const HERE: string = path.resolve();

const directoryChecker = (objectArr: INoAdsResult[], newPath: string): INoAdsResult[] | void => {
    /**
     *  If given a new directory, move there
     */
    if (path.resolve() !== objectArr[0].directory) {
        process.chdir(objectArr[0].directory)
    }
    /**
     * Gather the names of the files currently in the Directory, Filter those matches out of the new posts
     */
    return fs.readdir(newPath ? newPath : HERE, (err: Error, files: string[]): INoAdsResult[] | void => {
        if (err) {
            console.error(err);
        } else {
            return objectArr.reduce((newPosts: INoAdsResult[], currentPost: INoAdsResult): INoAdsResult[] =>
                files.includes(currentPost.title)
                    ? newPosts
                    : [...newPosts, currentPost],
                []);
        }
    });
};

export default directoryChecker;