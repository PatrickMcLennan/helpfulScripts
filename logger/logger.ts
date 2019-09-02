import * as fs from 'fs';

const appendLog = async (message: string | Error, currentDir: string): Promise<void> => {
    const log: fs.WriteStream = fs.createWriteStream(`${currentDir}/logs.txt`, { flags: 'a' });
    await log.write([...log.toString().split('\n'), `${message}\n`].join('\n').replace('[object Object]', '----'));
    return log.end();
}

const createNewLog = (message: string | Error, currentDir: string): void =>
    fs.writeFile(`${currentDir}/logs.txt`, `${message}\n`, (err: Error): void => {
        if (err) {
            console.error(`There was an error creating the logs -> ${err}`);
        }
    });

const logger = (message: string | Error, currentDir: string): void =>
    fs.readdir(currentDir, (err: Error, files: string[]): Promise<void> | void => {
        /**
         *  Check to see if working directory has logs - create if it doesn't,
         *  append if it do.
         */
        return files.includes('logs.txt') ? appendLog(message, currentDir) : createNewLog(message, currentDir);
    });

export default logger;