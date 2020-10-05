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
const pirateBayPage = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const URL = `https://thepiratebay.org/user/${userName}`;
    const newBrowser = yield puppeteer.launch({ headless: true });
    const newPage = yield newBrowser.newPage();
    yield newPage.goto(URL, { waitUntil: 'networkidle0', timeout: 0 });
    const videoResults = yield newPage.evaluate(() => {
        const allRows = [...document.querySelectorAll('tr')].slice(1, [...document.querySelectorAll('tr')].length - 2);
        return allRows.map((singleResult) => {
            return {
                magnet: singleResult
                    .querySelector('td a[title="Download this torrent using magnet"]')
                    .getAttribute('href'),
                stats: [
                    ...singleResult
                        .querySelector('td .detDesc')
                        .textContent.trim()
                        .split(',')
                ],
                tags: [...singleResult.querySelectorAll('.vertTh center a')].map((aElement) => aElement.textContent),
                title: singleResult.querySelector('.detLink').textContent,
                url: `https://thepiratebay.org${singleResult.querySelector('.detLink').getAttribute('href')}`
            };
        });
    });
    yield newBrowser.close();
    return videoResults;
});
exports.default = pirateBayPage;
