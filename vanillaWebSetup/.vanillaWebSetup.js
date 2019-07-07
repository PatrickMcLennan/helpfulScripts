const path = require('path');
const fs = require('fs');
const here = path.resolve();

const NAME = process.argv[2];
const ARG_COUNT = process.argv.length;

const htmlStart = '<!doctype html>';
const htmlEnd = '</html>';
const cssStart = '*,';
const cssEnd = 'min-width: 100vw; }';

const reader = (start, stop, text) => {
    const textArr = text.split('\n');
    const beginning = textArr.indexOf(start);
    const end = textArr.indexOf(stop);

    return textArr
        .slice(beginning, end)
        .toString()
        .replace(/,/g, '\n')
        .replace(/The HTML5 Herald/g, NAME);
};

if (ARG_COUNT <= 2) {
    console.log(`
    ------------------------------------------
    You must pass 1 argument into this script.
    ------------------------------------------
    `);
} else if (ARG_COUNT === 3) {
    fs.readFile('./resets.txt', 'utf-8', (err, text) => {
        if (err) {
            console.error(err);
        } else {
            const files = ['index.html', 'style.css', 'app.js'];
            const theGoodStuff = [
                reader(htmlStart, htmlEnd, text),
                reader(cssStart, cssEnd, text),
                'Testing'
            ];

            files.forEach(file =>
                fs.writeFile(file, theGoodStuff[files.indexOf(file)], err =>
                    err
                        ? console.error(err)
                        : console.log(`${file} was created in ${here}`)
                )
            );
        }
    });
} else {
    console.log(`
    ------------------------------------
    This script only accepts 1 argument.
    ------------------------------------
    `);
}
