const ROOT = require('../root');
const glob = require('glob');
const webpack = require('webpack');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'test';

/**
 * UT files
 */
const testFiles = glob.sync('./test/browser-tests/**/*.ts')
	.concat(glob.sync('./test/node-tests/**/*.ts'));
const allFiles = ['./config/setup.js'].concat(testFiles);

module.exports = {
	watch: true,
	entry: testFiles,
	output: {
		filename: '__spec-build.js',
	},
	module: {

		preLoaders: [
		/**
		 * Tslint loader support for *.ts files
		 *
		 * See: https://github.com/wbuchwalter/tslint-loader
		 */
			{
				test: /\.ts$/,
				loader: 'tslint-loader',
				exclude: [ROOT('node_modules')]
			},
		/**
		 * Source map loader support for *.js files
		 * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
		 *
		 * See: https://github.com/webpack/source-map-loader
		 */
			{
				test: /\.js$/,
				loader: 'source-map-loader',
				exclude: [
					// these packages have problems with their sourcemaps
					ROOT('node_modules/rxjs'),
					ROOT('node_modules/@angular')
				] }
		],
		/**
		 * An array of automatically applied loaders.
		 *
		 * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
		 * This means they are not resolved relative to the configuration file.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#module-loaders
		 */
		loaders: [
		/**
		 * Typescript loader support for .ts  and .tsx files
		 *
		 * Typescript only provides the type checking, but the transpilation from ES6 to ES5 is
		 * carried over by Babel, which is more webpack-friendly. This also allows to have some
		 * parts of the application written in js or jsx and have only babel run on them.
		 *
		 * See: https://github.com/s-panferov/awesome-typescript-loader
		 * See: https://github.com/babel/babel-loader
		 */
			{
				test: /\.ts(x?)$/,
				loader: 'babel-loader!awesome-typescript-loader',
				exclude:  [/\.(spec|e2e|async)\.ts$/]
			},

		/**
		 * Json loader support for *.json files.
		 *
		 * See: https://github.com/webpack/json-loader
		 */
			{ test: /\.json$/, loader: 'json-loader', exclude: [ROOT('src/index.html')] },

		/**
		 * Raw loader support for *.css files
		 * Returns file content as string
		 *
		 * See: https://github.com/webpack/raw-loader
		 */
			{ test: /\.css$/, loader: 'raw-loader', exclude: [ROOT('src/index.html')] },

			{ test: /\.scss$/, loader: 'css!postcss!sass', exclude: [ROOT('src/index.html')] },
		/**
		 * Raw loader support for *.html
		 * Returns file content as string
		 *
		 * See: https://github.com/webpack/raw-loader
		 */
			{ test: /\.html$/, loader: 'raw-loader', exclude: [ROOT('src/index.html')] },

			{ test: /\.less$/, loader:  'css!postcss!less', exclude: [ROOT('src/index.less')] }
		]

	},
	devServer: {
		contentBase: './',
		port: 8080,
		noInfo: false,
		hot: true,
		inline: true,
		proxy: {
			'/': {
				bypass: function(req, res, proxyOptions) {
					return '/config/runner.html';
				}
			}
		}
	},
	plugins: [
		// By default, webpack does `n=>n` compilation with entry files. This concatenates
		// them into a single chunk.
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};