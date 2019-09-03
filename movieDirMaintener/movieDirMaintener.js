"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const logger_1 = require("../logger/logger");
const timeStamp_1 = require("../timeStamp/timeStamp");
const movieDirMainter = (currentDir) => fs.readdir(currentDir, (err, files) => {
    if (err) {
        return logger_1.default(`There was an error reading ${currentDir} at ${timeStamp_1.default()}`, currentDir);
    }
    else {
        const acceptedExts = ['avi', 'mkv'];
        return files.forEach((file) => {
            fs.lstat(file, (lStatErr, stats) => {
                if (lStatErr) {
                    return logger_1.default(`There was an error trying to maintain ${file} at ${timeStamp_1.default()}, -> ${lStatErr}`, currentDir);
                }
                else if (stats.isDirectory()) {
                    return fs.readdir(file, (isDirErr, unWantedDirFiles) => {
                        if (isDirErr) {
                            return logger_1.default(`There was an error trying to maintain ${file} at ${timeStamp_1.default()}, -> ${isDirErr}`, currentDir);
                        }
                        else {
                            return unWantedDirFiles.forEach((potentialMovie) => acceptedExts.includes(potentialMovie.split('.')[potentialMovie.split('.').length - 1])
                                ? fs.rename(potentialMovie, `../${potentialMovie}`, (renameErr) => {
                                    if (renameErr) {
                                        return logger_1.default(`There was an error moving ${potentialMovie} to ../${potentialMovie} at ${timeStamp_1.default()}, -> ${renameErr}`, currentDir);
                                    }
                                })
                                : fs.unlink(potentialMovie, (unlinkErr) => {
                                    if (unlinkErr) {
                                        return logger_1.default(`There was an error deleting ${potentialMovie} at ${timeStamp_1.default()}, -> ${unlinkErr}`, currentDir);
                                    }
                                }));
                        }
                    });
                }
            });
        });
    }
});
exports.default = movieDirMainter;
