const path = require('path');
const fs = require('fs');
const here = path.resolve();

const ARG_COUNT = process.argv.length;
const NEW_EXT = `.${process.argv[2]}`;
const OLD_EXT = `.${process.argv[3]}`;
let COUNTER = 1;

fs.readdir(here, (err, files) => {
    if (err) {
        console.error(err);
    } else if (ARG_COUNT === 2) {
        return console.log(`
        ---------------------------------------------------
        You must pass at least 1 argument into this script.
        ---------------------------------------------------
        `);
    } else {
        files.forEach(file => {
            const fileExt = path.extname(file);
            const newName = `Episode ${COUNTER}${NEW_EXT}`;

            if (
                (ARG_COUNT === 3 && fileExt === NEW_EXT) ||
                (ARG_COUNT === 4 && fileExt === OLD_EXT)
            ) {
                fs.rename(file, newName, err =>
                    err
                        ? console.error(err)
                        : console.log`Renaming ${file} to ${newName}`
                );
                COUNTER += 1;
            }
        });
    }
});
