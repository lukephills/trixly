const karma = require('karma');
const path = require('path');

function runKarma(failOnError = false, karmaOptions) {

	karmaOptions = karmaOptions || {}

	return function(done) {
		process.env.NODE_ENV = 'test';
		new karma.Server(Object.assign({
				configFile: path.resolve('config/karma.conf.js')
			}, karmaOptions),
			function(err) {
				if ( err) {
					if (failOnError) {
						const error = new Error('Browser test failed!');
						error.showStack = false;
						done(error);
						process.exit(1);
					} else {
						done();
						process.exit(err ? 1 : 0);
					}

				} else {
					done();

					process.exit(0);
				}
			})
			.start();
	}
}

module.exports = runKarma;
