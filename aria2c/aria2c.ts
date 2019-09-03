import { ChildProcess, exec as newShell } from 'child_process';
import * as dotenv from 'dotenv';
import { ITorrent } from '../dictionary';
import { default as logger } from '../logger/logger';
import { default as timeStamp } from '../timeStamp/timeStamp';
dotenv.config();

const aria2c = (torrent: ITorrent, currentDir: string): ChildProcess => {
    const shell: ChildProcess = newShell(`${process.env.ARIA2C_PATH} -c --seed-time=0 '${torrent.magnet}'`);

    shell.on('error', (err: Error): void => logger(`There was an error running aria2c at ${timeStamp()}, -> ${torrent.title}, -> ${err}`, currentDir));

    return shell.on('exit', (code: number): void => {
        if (code === 0) {
            return logger(`Scrape + Download was successful at ${timeStamp()}`, currentDir);
        } else {
            return logger(`aria2c returned an error exit status of ${code} for ${torrent.title} at ${timeStamp()} -> https://aria2.github.io/manual/en/html/aria2c.html#exit-status`, currentDir);
        }
    })
}

export default aria2c;