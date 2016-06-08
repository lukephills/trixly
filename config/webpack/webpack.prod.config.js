const webpack = require('webpack');
const path = require('path');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ROOT = path.join(__dirname, '/../../');


/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CompressionPlugin = require('compression-webpack-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {

	entry: path.join(ROOT, 'src'),

	/**
	 * Switch loaders to debug mode.
	 *
	 * See: http://webpack.github.io/docs/configuration.html#debug
	 */
	debug: false,

	/**
	 * Developer tool to enhance debugging
	 *
	 * See: http://webpack.github.io/docs/configuration.html#devtool
	 * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
	 */
	devtool: 'source-map',

	/**
	 * Options affecting the output of the compilation.
	 *
	 * See: http://webpack.github.io/docs/configuration.html#output
	 */
	output: {
		library: 'MyTsLibrary',

		/**
		 * The output directory as absolute path (required).
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-path
		 */
		path: path.join(ROOT, 'dist'),

		/**
		 * Specifies the name of each output file on disk.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-filename
		 */
		filename: 'trixly.min.js',

		/**
		 * The filename of the SourceMaps for the JavaScript files.
		 * They are inside the output.path directory.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
		 */
		sourceMapFilename: '[name].map',
		libraryTarget: 'umd'
	},

	resolve: {
		/*
		 * An array of extensions that should be used to resolve modules.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
		 */
		extensions: ['', '.tsx', '.ts', '.js', '.less', '.css'],

		// remove other default values
		modulesDirectories: ['node_modules'],

		// Make sure root is src
		root: path.join(ROOT, 'src')
	},

	module: {
		/*
		 * An array of applied pre and post loaders.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
		 */
		preLoaders: [
			/*
			 * Tslint loader support for *.ts files
			 *
			 * See: https://github.com/wbuchwalter/tslint-loader
			 */
			{ test: /\.ts$/, loader: 'tslint-loader', exclude: [ path.join(ROOT, 'node_modules') ] },


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
					path.join(ROOT, 'ode_modules/rxjs'),
					path.join(ROOT, 'node_modules/@angular')
				]
			}

		],
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
				exclude: [/\.(spec|e2e)\.ts$/]
			},

			/*
			 * Json loader support for *.json files.
			 *
			 * See: https://github.com/webpack/json-loader
			 */
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},

	/**
	 * TSLint decreases bikeshedding and increases maintainability with
	 * advanced options configuration.
	 *
	 * See: https://github.com/wbuchwalter/tslint-loader
	 */
	tslint: {
		emitErrors: true,
		failOnHint: false,
		resourcePath: 'src'
	},

	/**
	 * Add additional plugins to the compiler.
	 *
	 * See: http://webpack.github.io/docs/configuration.html#plugins
	 */
	plugins: [
	/**
	 * Plugin: DedupePlugin
	 * Description: Prevents the inclusion of duplicate code into your bundle
	 * and instead applies a copy of the function at runtime.
	 *
	 * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
	 * See: https://github.com/webpack/docs/wiki/optimization#deduplication
	 */
		new DedupePlugin(),

	/**
	 * Plugin: UglifyJsPlugin
	 * Description: Minimize all JavaScript output of chunks.
	 * Loaders are switched into minimizing mode.
	 *
	 * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
	 */
		new UglifyJsPlugin({

			beautify: false,
			mangle: {
				screw_ie8 : true,
				keep_fnames: true
			},
			compress: {
				screw_ie8: true,
				keep_fnames: true,
				drop_debugger: false,
				dead_code: false,
				unused: false,
				warnings: false
			}, //prod
			comments: false //prod
		})
	],

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