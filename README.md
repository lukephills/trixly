## Trixly

[![Build Status](https://travis-ci.org/trixler/trixly.svg?branch=master)](https://travis-ci.org/trixler/trixly)
[![CircleCI](https://circleci.com/gh/trixler/trixly.svg?style=svg)](https://circleci.com/gh/trixler/trixly)
[![Coverage Status](https://coveralls.io/repos/github/trixler/trixly/badge.svg?branch=master)](https://coveralls.io/github/trixler/trixly?branch=master)
[![npm version](https://badge.fury.io/js/trixly.svg)](https://badge.fury.io/js/trixly)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://github.com/trixler/trixly/blob/master/LICENSE.md)

> Universal TypeScript starter kit for Angular 2 and React

Fast, reliable TypeScript development stack for building [Angular 2.0](https://angularjs.org/) and [React](https://github.com/facebook/react) applications
based on webpack using TypeScript 1.9x together with Babel (async/await and generators in ES5).

## Features

- [x] Statically typed build system for working with [Typescript](https://www.typescriptlang.org/)
- [x] Maintain a consistent code style with [TSLint](https://palantir.github.io/tslint/)
- [x] Production and development builds.
- [x] Intelligent code editing with [VSCode](https://code.visualstudio.com/)
- [x] Mock modules for testing purposes with [Rewire](https://github.com/speedskater/babel-plugin-rewire)
- [x] Run test doubles with [Sinon.JS](http://sinonjs.org/)
- [x] Sample unit tests with Mocha and [Karma](http://karma-runner.github.io/0.13/index.html) including code coverage via [istanbul](https://gotwarlost.github.io/istanbul/).
- [x] Following the [best practices](https://angular.io/styleguide).
- [x] Manager of your type definitions using [typings](https://github.com/typings/typings).
- [x] ES7 to ES5 transpilation with [Babel](http://babeljs.io/)
- [x] Test Driven Development (TDD)
- [x] Async and await
- [x] Code coverage report with [Istanbul Instrumenter Loader](https://github.com/deepsweet/istanbul-instrumenter-loader)
- [x] Sourcemap
- [x] Let you play with `CSS`, `LESS`, `SASS`, `HTML`, and `JSON`
- [x] Mocha & chai de facto standard

## Quick start

The only development dependency of this project is [Node.js](https://nodejs.org/en/). So just make sure you have it installed. Then
type few commands known to every Node developer...

```bash
git clone --depth 1 https://github.com/trixler/trixly.git
cd trixly
# install the project's dependencies
npm install

# dev build
npm run build:dev
# prod build
npm run build:prod
```
... and boom! You have it all setup for you!

## Workflow

* `npm run build` - build bundle both for development and production
* `npm run build:dev` -  builds bundle for development
* `npm run build:prod` - builds bundle for production
* `npm run test` - runs all tests using Karma & Mocha
* `npm run test:phantom` - runs the unit tests for browser with PhantomJS
* `npm run test:chrome` - runs the unit tests for browser with Chrome
* `npm run test:node` - runs the unit tests in the `node.js` environment
* `npm run clean` - remove the coverage report - and the dist folder
* `npm run clean:dist` - remove the dist folder
* `npm run prebuild:dev` - clear the dist folder and generate a non-minified script
* `npm run watch` - run all unit tests, and watch files for changes
* `npm run watch:node` - run all unit tests in the `node.js` environemnt, and watch files for changes
* `npm run watch:browser` - run all unit tests for browser and watch files for changes
* `npm run watch:chrome` - run all unit tests for browser with Chrome and watch files for changes
* `npm run lint` - validates all TypeScript files using tslint
* `npm run lint:src` - validates the source files
* `npm run lint:tests` - validates the unit tests
* `npm run browser` - runs browser unit tests in the browser.
* `npm run dependencies:check` - shows a list over dependencies with a higher version number then the current one - if any
* `npm run dependencies:upgrade` - automatically upgrade all devDependencies & dependencies, and update package.json

### Folder structure

```bash
.
├── script                      # Babel configuration for React.
├── vscode                      # VSCode configuration.
├── dist                        # Built, ready to serve app.
├── config                      # Root folder for configurations.
│   ├── test                    # Test configurations.
│   ├── types                   # Global type definitions, written by us.
│   ├── webpack                 # Webpack configurations.
│   ├── circle-ci               # Circle CI configuration.
│   ├── gl-ci                   # GitLab CI configuration.
│   ├── banner.js               # Banner configuration for development builds
│   ├── karma.conf.js           # Karma configuration.
│   ├── root.js                 # Util file for finding the root.
│   └── runner.hml              # Mocha browser HTML configuration.
├── node_modules                # Node Packages.
├── src                         # Source code.
│   └── trixly.ts               # Entry point.
├── typings                     # Type definitions installed with typings.
├── .gitignore                  # Tells git which files to ignore.
├── package.json                # Package configuration.
├── CLA.md                      # Contributor License Agreement.
├── LICENSE.md                  # License.
├── README.md                   # Readme.
├── tsconfig.json               # TypeScript transpiler configuration.
├── tslint.json                 # TSLint configuration.
└── typings.json                # Typings package configuration.
```

### Browser tests

The browser spec runner - `./config/runner.html` - can be opened in a browser to run your tests. For it to work, you must first run `npm run browser`, and then
open `port 8080`. This will set up a watch task that will automatically refresh the tests when your scripts, or the tests, change.


### License

The MIT License (MIT)

Copyright (c) 2016 KFlash

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the
Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
