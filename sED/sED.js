"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const path = require("path");
const youtubeChannel_1 = require("../youtubeChannel/youtubeChannel");
dotenv.config();
const HERE = path.resolve();
process.chdir(HERE);
youtubeChannel_1.default(process.env.YOUTUBE_CHANNEL_2).then();
