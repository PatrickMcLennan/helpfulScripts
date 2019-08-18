# pugSetup

Takes 1 argument (the project name), and creates a boilerplate pug, SCSS & Vanilla JS project.

```
    node pugSetup myProject
```

Will create `myProject` in the current directory. Within that, creates `src` + `dist` directories + the following files.

```
myProject
|
|----> dist
|   |-> index.html
|   |-> style.css
|   |-> app.js
|
|----> src
|   |-> index.pug
|   |-> style.scss
|   |-> es6.js
|
|----> node_modules
|   |-> ...
|
|-> package.json
|-> package-lock.json

```

All dependencies come installed with npm scripts ready to go.

```
    npm run watch
```

Monitors all files within the `src` directory and, on save, compiles down into the `dist` directory. Babel, node-sass & pug will spit out es5, css & html.

```
    npm run build
```

Prepares the `dist` directory for production. uglify-js, postcss w/ autoprefixer + cssnano & html-minifier minify all 3 files, stripping them of comments and whitespace as well as prefixing the css.

---

`pugSetup` installs the following as devDependencies:

```
@babel/cli
@babel/core
@babel/preset-env
autoprefixer
concurrently
cssnano
eslint
html-minifier
node-sass
postcss
postcss-cli
pug
pug-cli
uglify-js

```
