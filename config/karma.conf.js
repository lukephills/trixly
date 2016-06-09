const webpackConfig  = require('./webpack/webpack.karma.config');
const isCI = process.env.CONTINUOUS_INTEGRATION === 'true';

module.exports = function (config) {

	const configuration = {
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '..',
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai', 'sinon'],
		client: { args: ['--grep', config.grep || ''] },
		// list of files / patterns to load in the browser
		files: [ { pattern: './test/spec-bundle.js', watched: false } ],
		// list of files to exclude
		exclude: [],
		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			// Reference: http://webpack.github.io/docs/testing.html
			// Reference: https://github.com/webpack/karma-webpack
			// Convert files with webpack and load sourcemaps
			'./test/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
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
		webpackMiddleware: {
			noInfo: true,
			stats: {
				// With console colors
				colors: true,
				// add the hash of the compilation
				hash: true,
				// add webpack version information
				version: false,
				// add timing information
				timings: true,
				// add assets information
				assets: true,
				// add chunk information
				chunks: true,
				// add built modules information to chunk information
				chunkModules: false,
				// add built modules information
				modules: false,
				// add also information about cached (not built) modules
				cached: true,
				// add information about the reasons why modules are included
				reasons: false,
				// add the source code of modules
				source: true,
				// add details to errors (like resolving log)
				errorDetails: true,
				// add the origins of chunks and chunk merging info
				chunkOrigins: true,
				// Add messages from child loaders
				children: false
			}
		},
		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['mocha', 'coverage'],
		mochaReporter: { output: 'autowatch' },
		// web server port
		port: 9876,
		captureTimeout: 60000,
		browserDisconnectTimeout : 60000,
		browserDisconnectTolerance : 3,
		browserNoActivityTimeout : 60000,
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