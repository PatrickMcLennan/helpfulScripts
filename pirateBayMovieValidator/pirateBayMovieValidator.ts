import * as dotenv from 'dotenv';
import { ITorrent } from '../dictionary';
dotenv.config();

const pirateBayMovieValidator = (torrentArray: ITorrent[]): ITorrent[] => {
    /**
     * Make sure it has the movies tag and is less than 7.5 gigs.
     */
    const acceptedMovies: ITorrent[] =
        torrentArray
            .filter((torrent: ITorrent): boolean => torrent.tags.includes('Movies') && Number(torrent.stats[1].split(' ')[1]) < 7.5);

    /**
     * Prepare for download according to user who uploaded.
     * Come back to this later.
     */

    // switch (userName) {
    //     case process.env.PIRATEBAY_USER_1:
    //         break;

    //     case process.env.PIRATEBAY_USER_2:
    //         break;

    //     default:
    //         console.log('hello?');
    // }

    return torrentArray;
}

export default pirateBayMovieValidator;