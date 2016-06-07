const karma = require('karma');
const path = require('path');

function runKarma(browser, singlerun) {
	return function(done) {

		process.env.NODE_ENV = 'test';
		new karma.Server({
				configFile: path.resolve('config/karma.conf.js'),
				singleRun: singlerun,
				browserNoActivityTimeout: 240000,
				captureTimeout: 120000,
				browsers: [browser]
			},
			function(err) {
				done();
				process.exit(err ? 1 : 0);
			}).start();
	}
}

module.exports = runKarma;
