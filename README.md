## Trixly

[![Build Status](https://travis-ci.org/trixler/trixly.svg?branch=master)](https://travis-ci.org/trixler/trixly)
[![npm version](https://badge.fury.io/js/trixly.svg)](https://badge.fury.io/js/trixly)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://github.com/trixler/trixly/blob/master/LICENSE.md)

### WORK IN PROGRESS!!

In the near future this will be an awsome TypeScript boilerplate!

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
* `npm run lint:src` - lint the source
* `npm run lint:tests` - lint the unit tests
* `npm run dependencies:check` - shows a list over dependencies with a higher version number then the current one - if any
* `npm run dependencies:upgrade` - automatically upgrade all devDependencies & dependencies, and update package.json
