const path = require('path');
import path from 'path';
const _root = path.join(__dirname, '/../');

module.exports = {
	APPLICATION: 'trolly',
	minified: 'trolly.min.js',
	dev: 'trolly.js',
	eslintDir: path.join(_root, '.eslintrc'),
	distDir: path.join(_root, 'dist'),
	sourceDir: path.join(_root, 'src'),
	testDir: path.join(_root, 'test'),
	setupDir: path.join(_root, 'test/setup/node.js'),
	karmaConf: path.join(_root, 'config/karma.conf.js')
};