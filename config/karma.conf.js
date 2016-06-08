'use strict';

const webpack_karma_config = require('./webpack/webpack.karma.config');

module.exports = function (config) {

    const configuration = {
        basePath: '..',
        frameworks: ['mocha', 'chai'],
        files: [
            './test/browser-tests/**/*.ts'
        ],
        preprocessors: {
            './test/browser-tests/*.ts': ['coverage', 'webpack', 'sourcemap']
        },
        webpack: webpack_karma_config,
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'text' },
                { type: 'lcov' },
                { type: 'text-summary' },
                { type: 'json' },
                { type: 'html' }
            ]
        },
        webpackServer: { noInfo: true },
        reporters: ['mocha', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
	    customLaunchers: {
		    Chrome_travis_ci: {
			    base: 'Chrome',
			    flags: ['--no-sandbox']
		    }
	    },
	    singleRun: true,
        client: {
            mocha: { ui: 'bdd' }
        }
    };

	if (process.env.TRAVIS || process.env.CIRCLECI) {
		configuration.browsers = ['Chrome_travis_ci'];
		configuration.singleRun = true;
	}

    config.set(configuration);
};