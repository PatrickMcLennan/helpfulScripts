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
const fs = require("fs");
const appendLog = (message, currentDir) => __awaiter(void 0, void 0, void 0, function* () {
    const log = fs.createWriteStream(`${currentDir}/logs.txt`, { flags: 'a' });
    yield log.write([...log.toString().split('\n'), `${message}\n`].join('\n').replace('[object Object]', '----'));
    return log.end();
});
const createNewLog = (message, currentDir) => fs.writeFile(`${currentDir}/logs.txt`, `${message}\n`, (err) => {
    if (err) {
        console.error(`There was an error creating the logs -> ${err}`);
    }
});
const logger = (message, currentDir) => fs.readdir(currentDir, (err, files) => {
    return files.includes('logs.txt') ? appendLog(message, currentDir) : createNewLog(message, currentDir);
});
exports.default = logger;
