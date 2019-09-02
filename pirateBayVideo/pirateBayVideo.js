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
const dotenv = require("dotenv");
const puppeteer = require("puppeteer");
dotenv.config();
const pirateBayVideo = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const URL = `https://thepiratebay.org/user/${userName}`;
    const newBrowser = yield puppeteer.launch({ headless: true });
    const newPage = yield newBrowser.newPage();
    yield newPage.goto(URL, { waitUntil: 'networkidle0', timeout: 0 });
    const videoResults = yield newPage.evaluate(() => {
        const allResults = document.querySelector('#main-content tbody');
        return [...allResults.querySelectorAll('tr')].reduce((validPosts, currentPost) => [...currentPost.querySelectorAll('vertTh a')].map((aTag) => aTag.textContent).includes('E-books')
            ? validPosts
            : [...validPosts, {
                    magnet: currentPost.querySelector('[title~="magnet"]').getAttribute('href'),
                    title: currentPost.querySelector('.detName a').textContent,
                    url: `https://thepiratebay.org/${currentPost.querySelector('.detName a').getAttribute('href')}`,
                }], []);
    });
    yield newBrowser.close();
    return videoResults;
});
exports.default = pirateBayVideo;
