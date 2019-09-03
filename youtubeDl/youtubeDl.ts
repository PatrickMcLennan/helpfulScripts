import { ChildProcess, exec as newShell } from 'child_process';
import * as dontenv from 'dotenv';
import { default as logger } from '../logger/logger';
import { default as timeStamp } from '../timeStamp/timeStamp';
dontenv.config();

const youtubeDl = async (videoUrl: string, directory: string): Promise<ChildProcess> => {
    /**
     * Open a shell, run script
     */
    const script: ChildProcess = await newShell(`${process.env.YOUTUBE_DL_PATH} -f best ${videoUrl}`, (err: Error) => {
        if (err) {
            console.error(`There was an error exectuing youtube-dl on ${timeStamp()} -> ${videoUrl}, ${err}`, directory);
        }
    });
    /**
     * Log any errors
     */
    script.on('error', (err: Error): void => logger(`There was an error executing youtube-dl on ${timeStamp()} -> ${videoUrl}, ${err}`, directory));

    return script.on('exit', (code: number, signal: string): void => {
        if (code !== 0) {
            logger(`There was an error executing youtube-dl on ${timeStamp()} -> ${videoUrl}`, directory);
        }
    });
};

export default youtubeDl;