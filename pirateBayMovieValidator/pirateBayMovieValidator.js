"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const pirateBayMovieValidator = (torrentArray) => {
    const acceptedMovies = torrentArray
        .filter((torrent) => torrent.tags.includes('Movies') && Number(torrent.stats[1].split(' ')[1]) < 7.5);
    return torrentArray;
};
exports.default = pirateBayMovieValidator;
