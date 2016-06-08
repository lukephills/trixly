const pkg = require('../package.json');

function getBanner() {
	return '/*!\n' +
		' * ' + pkg.name + ' v' + pkg.version + '\n' +
		' * (c) ' + new Date().getFullYear() + ' ' + pkg.author.name + '\n' +
		' * Released under the ' + pkg.license + ' License.\n' +
		' */';
}

module.exports = getBanner;