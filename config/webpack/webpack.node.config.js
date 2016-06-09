const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ROOT = require('../root');

/**
 * Webpack Plugins
 */

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = {
	entry: ROOT('src'),
	output: {
		/**
		 * The output directory as absolute path (required).
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-path
		 */
		path: ROOT('dist'),
		/**
		 * Specifies the name of each output file on disk.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-filename
		 */
		filename: 'trixly.js',

		/**
		 * The filename of the SourceMaps for the JavaScript files.
		 * They are inside the output.path directory.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
		 */
		sourceMapFilename: 'trixly-test.map',
	},
	/**
	 * Developer tool to enhance debugging
	 *
	 * See: http://webpack.github.io/docs/configuration.html#devtool
	 * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
	 */
	devtool: 'inline-source-map',
	noInfo: true,
	resolve: {
		// Make sure root is src
		root: ROOT('src'),
		/*
		 * An array of extensions that should be used to resolve modules.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
		 */
		extensions: ['', '.ts', '.tsx', '.js'],

		// remove other default values
		modulesDirectories: ['node_modules'],
		alias: {
			sinon: ROOT('/node_modules/sinon/pkg/sinon.js')
		}
	},
	module: {
		preLoaders: [
			/*
			 * Tslint loader support for *.ts files
			 *
			 * See: https://github.com/wbuchwalter/tslint-loader
			 */
			{ test: /\.ts(x?)$/, loader: 'tslint-loader', exclude: [ ROOT('node_modules') ] },


			/*
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
				]
			}
		],
		loaders: [

			{
				test: /\.ts(x?)$/,
				loader: 'babel-loader!awesome-typescript-loader',
				exclude: /node_modules/
			},

			/*
			 * Json loader support for *.json files.
			 *
			 * See: https://github.com/webpack/json-loader
			 */
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.less$/,
				loader: 'css?sourceMap!postcss!less?sourceMap'
			},

			/*
			 * Support for CSS (with hot module replacement)
			 *
			 * See: https://github.com/webpack/json-loader
			 */
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},

			// support for .html as raw text
			{ test: /\.html$/,  loader: 'raw' },

			// make sinon available for node.js unit tests
			{ test: /sinon\.js$/, loader: 'imports?require=>false' }
		]
	},

	/**
	 * TSLint decreases bikeshedding and increases maintainability with
	 * advanced options configuration.
	 *
	 * See: https://github.com/wbuchwalter/tslint-loader
	 */	tslint: {
		emitErrors: true,
		failOnHint: false,
		resourcePath: 'src'
	},

	plugins: [

		new DefinePlugin({
			'ENV': JSON.stringify(ENV),
			'HMR': false,
			'process.env': {
				'ENV': JSON.stringify(ENV),
				'NODE_ENV': JSON.stringify(ENV),
				'HMR': false
			}
		}),

		/*
		 * Plugin: OccurenceOrderPlugin
		 * Description: Varies the distribution of the ids to get the smallest id length
		 * for often used ids.
		 *
		 * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
		 * See: https://github.com/webpack/docs/wiki/optimization#minimize
		 */
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.DedupePlugin()
	],
	postcss: () => [autoprefixer({browsers: 'last 2 versions'})],
	/*
	 * Include polyfills or mocks for various node stuff
	 * Description: Node configuration
	 *
	 * See: https://webpack.github.io/docs/configuration.html#node
	 */
	node: {
		global: 'window',
		crypto: 'empty',
		process: true,
		module: false,
		clearImmediate: false,
		setImmediate: false
	}
};