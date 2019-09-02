"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const checkDirForDoubles_1 = require("../checkDirForDoubles/checkDirForDoubles");
const imgDownloader_1 = require("../imgDownloader/imgDownloader");
const logger_1 = require("../logger/logger");
const redditTsScraper_1 = require("../redditTsScraper/redditTsScraper");
const timeStamp_1 = require("../timeStamp/timeStamp");
const HERE = path.resolve();
redditTsScraper_1.default('widescreenWallpaper')
    .then((validatedPosts) => checkDirForDoubles_1.default(validatedPosts, `${HERE}/bgs`))
    .then((newPosts) => imgDownloader_1.default(newPosts))
    .then(() => logger_1.default(`Successfully ran on ${timeStamp_1.default()}`, HERE))
    .catch((err) => logger_1.default(`An error occured on ${timeStamp_1.default()}, -> ${err}`, HERE));
