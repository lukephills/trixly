let gulp = require('gulp');
let exec = require('child_process').exec;
let reportError = require('../util/reportError');
let semver;

/**
 * This Gulp task checks your environment for valid Node and NPM version, and output
 * errors.
 *
 * Works the same way as Angular 2's checkEnvironment()
 */

try {
	semver = require('semver');
} catch(e) {
	reportError("Looks like you are missing some npm dependencies. Run: npm install");
}

// Check environment
gulp.task('check:environment', function() {


	exec('npm --version', function(e, stdout, stderr) {

		if (e !== null) {
			reportError('npm preinstall error: ' + e + stderr);
		}

		if (!semver.gte(stdout, '2.14.2')) {
			reportError('You are running unsupported npm version. Found: ' + stdout +  'Expected: v5.4.1 or newer. Run: npm update -g npm.');
		}
	});

	exec('node --version',
		function(e, stdout, stderr) {
			if (e !== null) {
				reportError('npm preinstall error: ' + error + stderr);
			}

			if (!semver.gte(stdout, '4.0.0')) {
				reportError('You are running unsupported node version. Found: ' + stdout +  'Expected: v5.4.1 or newer. Use nvm to update your node version.');
			}
		});
});
