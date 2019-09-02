"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const logger_1 = require("../logger/logger");
const directoryChecker = (objectArr, directory) => __awaiter(void 0, void 0, void 0, function* () {
    let currentFiles = [];
    yield fs.readdir(directory, (err, files) => {
        if (err) {
            return logger_1.default(`There was an error checking the directory for duplicates -> ${err}`, directory);
        }
        else {
            return currentFiles = files;
        }
    });
    return objectArr.reduce((newPosts, currentPost) => currentFiles.includes(currentPost.title)
        ? newPosts
        : [...newPosts, currentPost], []);
});
exports.default = directoryChecker;
