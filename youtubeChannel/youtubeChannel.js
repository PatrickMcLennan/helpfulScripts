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
const youtubeChannel = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    const newBrowser = yield puppeteer.launch({ headless: true });
    const channelPage = yield newBrowser.newPage();
    yield channelPage.goto(channel, { waitUntil: 'networkidle0', timeout: 0 });
    const allResults = yield channelPage.evaluate(() => {
        const linksWrapper = document.querySelector('#primary #items');
        const channelName = document.querySelector('#channel-name #text').textContent;
        return [...Array.from(linksWrapper.querySelectorAll('#dismissable'))].map((singleResult) => {
            return {
                channel: channelName,
                title: singleResult.querySelector('#dismissable #video-title').textContent,
                url: `https://youtube.com${singleResult
                    .querySelector('#dismissable #video-title')
                    .getAttribute('href')}`
            };
        });
    });
    yield newBrowser.close();
    return allResults;
});
exports.default = youtubeChannel;
