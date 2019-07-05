const path = require('path');
const fs = require('fs');
const here = path.resolve();

const NAME = process.argv[2];

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
        .replace(/,/g, '\n');
};

if (process.argv.length <= 2) {
    console.log(`
    ------------------------------------------
    You must pass 1 argument into this script.
    ------------------------------------------
    `);
} else {
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
}
