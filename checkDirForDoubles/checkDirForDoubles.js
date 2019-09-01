"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const HERE = path.resolve();
const directoryChecker = (objectArr, newPath) => {
    if (path.resolve() !== objectArr[0].directory) {
        process.chdir(objectArr[0].directory);
    }
    return fs.readdir(newPath ? newPath : HERE, (err, files) => {
        if (err) {
            console.error(err);
        }
        else {
            return objectArr.reduce((newPosts, currentPost) => files.includes(currentPost.title)
                ? newPosts
                : [...newPosts, currentPost], []);
        }
    });
};
exports.default = directoryChecker;
