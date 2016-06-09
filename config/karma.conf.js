const webpackConfig  = require('./webpack/webpack.karma.config');
const isCI = process.env.CONTINUOUS_INTEGRATION === 'true';

module.exports = function (config) {

	const configuration = {
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '..',
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai', 'sinon'],
		// list of files / patterns to load in the browser
		files: [ { pattern: './config/bundle.js', watched: false } ],
		// list of files to exclude
		exclude: [],
		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'./config/bundle.js': ['coverage', 'webpack', 'sourcemap']
		},
		webpack: webpackConfig,
		coverageReporter: {
			dir: '../coverage',
			reporters: [
				{ type: 'text' },
				{ type: 'lcov' },
				{ type: 'text-summary' },
				{ type: 'json' },
				{ type: 'html' }
			]
		},
		webpackServer: { noInfo: true },
		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['mocha', 'coverage'],
		mochaReporter: { output: 'autowatch' },
		// web server port
		port: 9876,
		// enable / disable colors in the output (reporters and logs)
		colors: true,
		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,
		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],
		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	};

	// Push *only* 'coveralls' to the reporters array if Travis, Circle or other continuous integration are running
	if (isCI) {
		configuration.reporters.push('coveralls');
	}

	config.set(configuration);
};