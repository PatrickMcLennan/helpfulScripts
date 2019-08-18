const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const here = path.resolve();
const NAME = process.argv[2];

const pugText = `doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        link(rel="stylesheet", href="./style.css")
        script(defer, src="./app.js")
        title ${NAME}
    body
`;
const es6Text = `const testing${NAME[0].toUpperCase()}${NAME.slice(
	1,
	NAME.length
)} = () => console.log('Testing ${NAME}.')`;
const scssText = `// MIXINS
@mixin flex($jc: center, $ai: center, $fd: row, $fw: nowrap) {
    display: flex;
    justify-content: $jc;
    align-items: $ai;
    flex-direction: $fd;
    flex-wrap: $fw;
}

// RESETS
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}
html {
    font-size: 62.5%;
    box-sizing: border-box;
}
body {
    @include flex();
    min-height: 100vh;
}`;
const packageJsonText = `
{
    "name": "${NAME}",
    "version": "1.0.0",
    "description": "",
    "main": "./dist/app.js",
    "scripts": {
      "sass": "node-sass -w './src/style.scss' -o './dist'",
      "babel": "babel -w './src/es6.js' -o './dist/app.js' --presets=@babel/preset-env",
      "eslint": "eslint src/**.js",
      "pug": "pug -w './src/index.pug' -o './dist'",
      "watch": "concurrently 'npm run sass' 'npm run babel' 'npm run eslint' 'npm run pug'",
      "minify-html": "html-minifier --collapse-whitespace --remove-comments --remove-tag-whitespace './dist/index.html' -o './dist/index.html'",
      "prefix": "postcss './dist/style.css' -o './dist/style.css' -u autoprefixer cssnano",
      "minify-js": "uglifyjs './dist/app.js' -c -m -o './dist/app.js'",
      "build": "concurrently 'npm run minify-html' 'npm run prefix' 'npm run minify-js'"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "@babel/cli": "^7.5.5",
		"@babel/core": "^7.5.5",
		"@babel/preset-env": "^7.5.5",
		"autoprefixer": "^9.6.1",
		"concurrently": "^4.1.1",
		"cssnano": "^4.1.10",
		"eslint": "^6.1.0",
		"html-minifier": "^4.0.0",
		"node-sass": "^4.12.0",
		"postcss": "^7.0.17",
		"postcss-cli": "^6.1.3",
		"pug": "^2.0.4",
		"pug-cli": "^1.0.0-alpha6",
		"uglify-js": "^3.6.0"
    },
    "browserslist": "last 10 versions"
  }
  
`;

if (process.argv.length !== 3 || process.argv[2].includes(' ')) {
    process.stdout.write('\033c');
	console.log(`
        ---------------------------------------------------------------------------------------------------------
        You can only enter one argument into this script, and for NPM to work properly it cannot include a space.
        ---------------------------------------------------------------------------------------------------------
    `);
    return process.exit(1);
} else {
	process.stdout.write('\033c');
	console.log('Creating directories...');
	fs.mkdir(`${here}/${NAME}`, err => {
		if (err) {
			return console.error(err);
		}
		process.chdir(`./${NAME}`);
		console.log(`Created 'dir' & 'src' within ${here}, creating files + inserting boilerplate code...`);

		const files = [
			{ name: 'index.pug', parent: 'src', text: pugText },
			{ name: 'es6.js', parent: 'src', text: es6Text },
			{ name: 'style.scss', parent: 'src', text: scssText },
			{ name: 'index.html', parent: 'dist' },
			{ name: 'app.js', parent: 'dist' },
			{ name: 'package.json', parent: '.', text: packageJsonText }
		];
		const boilerplateScripts = [
			"npx node-sass './src/style.scss' -x -o './dist'",
			"npx babel './src/es6.js' -o './dist/app.js' --presets=@babel/preset-env",
			"npx pug './src/index.pug' -o './dist'",
			"npx html-minifier --collapse-whitespace --remove-comments --remove-tag-whitespace './dist/index.html' -o './dist/index.html'",
			"npx postcss './dist/style.css' -o './dist/style.css' -u autoprefixer cssnano",
			"npx uglify-js './dist/app.js' -c -m -o './dist/app.js'"
		];

		['src', 'dist'].forEach(dir =>
			fs.mkdir(dir, err => {
				if (err) {
					console.error(err);
				}
			})
		);

		files.forEach(({ name, parent, text }) =>
			fs.writeFile(`${parent}/${name}`, text ? text : '', err => {
				if (err) {
					console.error(err);
				}
			})
		);

		return exec('npm install ;', err => {
			if (err) {
				return console.error(err);
			}
			console.log('Files created, packages installed, beginning to compile boilerplate code...');
			boilerplateScripts.forEach(script =>
				exec(script, err => {
					err
						? () => {
								console.error(err);
								process.exit(1);
                            }
						: process.exit(0);
				})
			);
			process.stdout.write('\033c');
			console.log(`
                    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
${NAME}s first build is complete.

HOW TO USE:
--> 'npm run watch' will use Babel, Pug and Sass to watch es6.js, index.pug + style.scss within ${NAME}/src.  On each files change + save it will compile into ${NAME}/src.
--> 'npm run build' will minify index.html and also app.js & prefix + minify style.css within ${NAME}/dist.

This comes installed with eslint - 'npx eslint --init' will initialize it.  Your call.

During build I'd recommend using a VS Code extension such as Live Server on ${NAME}/dist/index.html.
                    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            `);
			return process.exit(0);
		});
	});
}
