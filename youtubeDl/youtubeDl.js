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
const child_process_1 = require("child_process");
const dontenv = require("dotenv");
const logger_1 = require("../logger/logger");
const timeStamp_1 = require("../timeStamp/timeStamp");
dontenv.config();
const youtubeDl = (videoUrl, directory) => __awaiter(void 0, void 0, void 0, function* () {
    const script = yield child_process_1.exec(`${process.env.YOUTUBE_DL_PATH} -f best ${videoUrl}`, (err) => {
        if (err) {
            console.error(`There was an error exectuing youtube-dl on ${timeStamp_1.default()} -> ${videoUrl}, ${err}`, directory);
        }
    });
    script.on('error', (err) => logger_1.default(`There was an error executing youtube-dl on ${timeStamp_1.default()} -> ${videoUrl}, ${err}`, directory));
    return script.on('exit', (code, signal) => {
        if (code !== 0) {
            logger_1.default(`There was an error executing youtube-dl on ${timeStamp_1.default()} -> ${videoUrl}`, directory);
        }
    });
});
exports.default = youtubeDl;
