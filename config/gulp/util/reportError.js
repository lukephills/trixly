const chalk = require('chalk');

function reportError(message) {
	console.error(chalk.white.bgRed.bold(message));
	process.exit(1);
}
module.exports = reportError;