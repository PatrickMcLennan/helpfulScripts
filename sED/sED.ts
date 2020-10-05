import * as dotenv from 'dotenv';
import * as path from 'path';
import youtubeChannel from '../youtubeChannel/youtubeChannel';
import youtubeDl from '../youtubeDl/youtubeDl';
dotenv.config();

import { IYoutubeResult } from '../dictionary';

const HERE = path.resolve();

process.chdir(HERE);
youtubeChannel(process.env.YOUTUBE_CHANNEL_2).then();
