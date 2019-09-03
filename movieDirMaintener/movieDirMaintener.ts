import * as fs from 'fs';
import { default as logger } from '../logger/logger';
import { default as timeStamp } from '../timeStamp/timeStamp';

const movieDirMaintainer = (currentDir: string) =>
    /**
     * Read the current directory, loop over current files.
     */
    fs.readdir(currentDir, (err: Error, files: string[]) => {
        if (err) {
            return logger(`There was an error reading ${currentDir} at ${timeStamp()}`, currentDir);
        } else {
            const acceptedExts: string[] = ['avi', 'mkv'];
            return files.forEach((file: string): void => {
                fs.lstat(file, (lStatErr: Error, stats: fs.Stats): void => {
                    if (lStatErr) {
                        return logger(`There was an error trying to maintain ${file} at ${timeStamp()}, -> ${lStatErr}`, currentDir);
                    } else if (stats.isDirectory()) {
                        /**
                         * File is a directory, read its contents.
                         */
                        return fs.readdir(file, (isDirErr: Error, unWantedDirFiles: string[]): void => {
                            if (isDirErr) {
                                return logger(`There was an error trying to maintain ${file} at ${timeStamp()}, -> ${isDirErr}`, currentDir);
                            } else {
                                /**
                                 * Any file within that dir ending in a movie extension, bring it up a level.  Delete the rest.
                                 */
                                return unWantedDirFiles.forEach((potentialMovie: string): void =>
                                    acceptedExts.includes(potentialMovie.split('.')[potentialMovie.split('.').length - 1])
                                        ? fs.rename(potentialMovie, `../${potentialMovie}`, (renameErr: Error): void => {
                                            if (renameErr) {
                                                return logger(`There was an error moving ${potentialMovie} to ../${potentialMovie} at ${timeStamp()}, -> ${renameErr}`, currentDir);
                                            }
                                        })
                                        : fs.unlink(potentialMovie, (unlinkErr: Error): void => {
                                            if (unlinkErr) {
                                                return logger(`There was an error deleting ${potentialMovie} at ${timeStamp()}, -> ${unlinkErr}`, currentDir);
                                            }
                                        })
                                );
                            }
                        });
                    } else {
                        /**
                         * File is not a directory, rename it here
                         */
                    }
                });
            });
        }
    });

export default movieDirMaintainer;