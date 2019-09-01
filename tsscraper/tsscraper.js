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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer = require("puppeteer");
var fileNameValidator_1 = require("../fileNameValidator/fileNameValidator");
var redditScraper = function (SUB) { return __awaiter(void 0, void 0, void 0, function () {
    var URL, newBrowser, newPage, validPosts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                URL = "https://old.reddit.com/r/" + SUB;
                return [4 /*yield*/, puppeteer.launch({ headless: true })];
            case 1:
                newBrowser = _a.sent();
                return [4 /*yield*/, newBrowser.newPage()];
            case 2:
                newPage = _a.sent();
                return [4 /*yield*/, newPage.goto(URL, { waitUntil: 'networkidle0', timeout: 0 })];
            case 3:
                _a.sent();
                return [4 /*yield*/, newPage.evaluate(function () {
                        var posts = Array.from(document.querySelectorAll('.thing'));
                        /**
                         * Loop over each scraped post, pull what you want
                         */
                        return posts.map(function (post) {
                            return {
                                ads: [
                                    post.querySelector('.stickied-tagline') ? true : null,
                                    post.querySelector('.promoted-span') ? true : null,
                                    post.getAttribute('data-nsfw') !== 'false' ? true : null
                                ],
                                dataUrl: post.getAttribute('data-url'),
                                domain: post.querySelector('span > a').textContent,
                                title: post
                                    .querySelector('a[data-event-action="title')
                                    .textContent
                                    .replace('/', '-')
                                    .replace(' ', '-')
                                    .trim(),
                                titleHref: post.querySelector('a').getAttribute('href')
                            };
                        })
                            /**
                             * Filter out posts that contain a truthy within the ads array,
                             * these are either ads or nsfw.  Strip out this array from
                             * the valid posts + format the name properly.
                             */
                            .filter(function (post) { return !post.ads.includes(true); })
                            .map(function (goodPost) {
                            return {
                                dataUrl: goodPost.dataUrl,
                                domain: goodPost.domain,
                                title: fileNameValidator_1["default"](goodPost.title),
                                titleHref: goodPost.titleHref
                            };
                        });
                    })];
            case 4:
                validPosts = _a.sent();
                return [4 /*yield*/, newPage.close()];
            case 5:
                _a.sent();
                return [2 /*return*/, validPosts];
        }
    });
}); };
exports["default"] = redditScraper;
