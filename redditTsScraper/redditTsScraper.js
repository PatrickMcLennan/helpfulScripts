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
const puppeteer = require("puppeteer");
const imgNameValidator_1 = require("../imgNameValidator/imgNameValidator");
const redditTsScraper = (SUB) => __awaiter(void 0, void 0, void 0, function* () {
    const URL = `https://old.reddit.com/r/${SUB}`;
    const newBrowser = yield puppeteer.launch({ headless: true });
    const newPage = yield newBrowser.newPage();
    yield newPage.goto(URL, { waitUntil: 'networkidle0', timeout: 0 });
    const validPosts = yield newPage.evaluate(() => {
        const posts = Array.from(document.querySelectorAll('.thing'));
        return posts.map((post) => {
            return {
                ads: [
                    post.querySelector('.stickied-tagline') ? true : null,
                    post.querySelector('.promoted-span') ? true : null,
                    post.getAttribute('data-nsfw') !== 'false' ? true : null
                ],
                dataUrl: post.getAttribute('data-url'),
                directory: '',
                domain: post.querySelector('span > a').textContent,
                title: post
                    .querySelector('a[data-event-action="title"')
                    .textContent,
                titleHref: post.querySelector('a').getAttribute('href'),
            };
        });
    });
    const formattedPosts = validPosts.reduce((validResultsArr, potentialResult) => !potentialResult.ads.includes(true)
        ? [...validResultsArr, {
                dataUrl: potentialResult.dataUrl,
                directory: '',
                domain: potentialResult.domain,
                title: imgNameValidator_1.default(potentialResult.title),
                titleHref: potentialResult.titleHref
            }]
        : validResultsArr, []);
    yield newBrowser.close();
    return formattedPosts;
});
exports.default = redditTsScraper;
