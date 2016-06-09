## Trixly

[![Build Status](https://travis-ci.org/trixler/trixly.svg?branch=master)](https://travis-ci.org/trixler/trixly)
[![CircleCI](https://circleci.com/gh/trixler/trixly.svg?style=svg)](https://circleci.com/gh/trixler/trixly)
[![Coverage Status](https://coveralls.io/repos/github/trixler/trixly/badge.svg?branch=master)](https://coveralls.io/github/trixler/trixly?branch=master)
[![npm version](https://badge.fury.io/js/trixly.svg)](https://badge.fury.io/js/trixly)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://github.com/trixler/trixly/blob/master/LICENSE.md)

> Universal TypeScript starter kit for Angular 2 and React

Provides fast, reliable and extensible starter for the development of [Angular 2.0](https://angularjs.org/) and [React](https://github.com/facebook/react) projects.

#### Work in progress!


## Features

* Statically typed build system for working with [Typescript](https://www.typescriptlang.org/)
* Maintain a consistent code style with [TSLint](https://palantir.github.io/tslint/)
* Production and development builds.
* Intelligent code editing with [VSCode](https://code.visualstudio.com/)
* Run test doubles with [Sinon.JS](http://sinonjs.org/)
* Sample unit tests with Mocha and [Karma](http://karma-runner.github.io/0.13/index.html) including code coverage via [istanbul](https://gotwarlost.github.io/istanbul/).
* Following the [best practices](https://angular.io/styleguide).
* Manager of your type definitions using [typings](https://github.com/typings/typings).
* Let you play with `CSS`, `LESS`, `HTML`, and `JSON`

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

* `npm run build:dev` - build task that generates both minified and non-minified scripts.
* `npm run build:dev` - build task that generate a non-minified script.
* `npm run build:prod` - build task that generate a minified script.
* `npm run test` - runs the unit tests for browser
* `npm run test:phantom` - runs the unit tests for browser with PhantomJS
* `npm run test:chrome` - runs the unit tests for browser with Chrome
* `npm run clean` - remove the coverage report - and the dist folder
* `npm run clean:dist` - remove the dist folder
* `npm run prebuild:dev` - clear the dist folder and generate a non-minified script
* `npm run watch` - run all unit tests in the node environemnt, and watch files for changes
* `npm run watch:browser` - run all unit tests for browser and watch files for changes
* `npm run watch:chrome` - run all unit tests for browser with Chrome and watch files for changes
* `npm run debug:phantom` - run repeated unit tests in PhantomJS after every file change
* `npm run debug:chrome` - run repeated unit tests in Chrome after every file change
* `npm run lint:src` - lint the source
* `npm run lint:tests` - lint the unit tests
* `npm run dependencies:check` - shows a list over dependencies with a higher version number then the current one - if any
* `npm run dependencies:upgrade` - automatically upgrade all devDependencies & dependencies, and update package.json


