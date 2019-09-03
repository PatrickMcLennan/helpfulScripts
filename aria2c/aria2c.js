"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const dotenv = require("dotenv");
const logger_1 = require("../logger/logger");
const timeStamp_1 = require("../timeStamp/timeStamp");
dotenv.config();
const aria2c = (torrent, currentDir) => {
    const shell = child_process_1.exec(`${process.env.ARIA2C_PATH} -c --seed-time=0 '${torrent.magnet}'`);
    shell.on('error', (err) => logger_1.default(`There was an error running aria2c at ${timeStamp_1.default()}, -> ${torrent.title}, -> ${err}`, currentDir));
    return shell.on('exit', (code) => {
        if (code === 0) {
            return logger_1.default(`Scrape + Download was successful at ${timeStamp_1.default()}`, currentDir);
        }
        else {
            return logger_1.default(`aria2c returned an error exit status of ${code} for ${torrent.title} at ${timeStamp_1.default()} -> https://aria2.github.io/manual/en/html/aria2c.html#exit-status`, currentDir);
        }
    });
};
exports.default = aria2c;
