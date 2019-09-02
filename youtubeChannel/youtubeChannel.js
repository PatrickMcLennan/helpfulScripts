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
const youtubeChannel = () => __awaiter(void 0, void 0, void 0, function* () {
    const newBrowser = yield puppeteer.launch({ headless: true });
    const channelPage = yield newBrowser.newPage();
    yield channelPage.goto(process.env.YOUTUBE_CHANNEL_1, { waitUntil: 'networkidle0', timeout: 0 });
    const allResults = yield channelPage.evaluate(() => {
        const linksWrapper = document.querySelector('#primary #items');
        return [...Array.from(linksWrapper.querySelectorAll('#dismissable'))].map((singleResult) => {
            return {
                channel: document.querySelector('#channel-name #text').textContent,
                title: singleResult.querySelector('#dismissable #video-title').textContent,
                url: `https://youtube.com${singleResult.querySelector('#dismissable #video-title').getAttribute('href')}`,
            };
        });
    });
    yield newBrowser.close();
    return allResults;
});
exports.default = youtubeChannel;
