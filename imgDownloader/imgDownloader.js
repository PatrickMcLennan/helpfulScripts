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
const https = require("https");
const imgDownloader = (validatedResults) => __awaiter(void 0, void 0, void 0, function* () {
    return validatedResults.forEach((post) => __awaiter(void 0, void 0, void 0, function* () {
        if (['jpeg', 'jpg', 'png'].includes(`${post.dataUrl.split('.')[post.dataUrl.split('.').length - 1]}`)) {
            const newFile = yield fs.createWriteStream(`${post.title}.${post.dataUrl.split('.')[post.dataUrl.split('.').length - 1]}`);
            return https.get(post.dataUrl, (res) => {
                res.pipe(newFile);
                return newFile.on('finish', () => __awaiter(void 0, void 0, void 0, function* () { return newFile.close(); }));
            });
        }
    }));
});
exports.default = imgDownloader;
