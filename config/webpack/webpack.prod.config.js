const ROOT = require('../root');

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

	entry: ROOT('src'),

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
		library: 'Trixly',

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
		filename: 'trixly.min.js',

		/**
		 * The filename of the SourceMaps for the JavaScript files.
		 * They are inside the output.path directory.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
		 */
		sourceMapFilename: 'trixly.min.map',
		libraryTarget: 'umd'
	},

	resolve: {
		/*
		 * An array of extensions that should be used to resolve modules.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
		 */
		extensions: ['', '.tsx', '.ts', '.js', '.less', '.json', '.css', '.html'],

		// remove other default values
		modulesDirectories: ['node_modules'],

		// Make sure root is src
		root: ROOT('src')
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
			{ test: /\.ts$/, loader: 'tslint-loader', exclude: [ ROOT('node_modules') ] },


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
				test: /\.js$/,
				loader: 'babel-loader!awesome-typescript-loader',
				exclude: /node_modules/
			},

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
		failOnHint: true,
		resourcePath: 'src'
	},

	/**
	 * Html loader advanced options
	 *
	 * See: https://github.com/webpack/html-loader#advanced-options
	 */
	// TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
	htmlLoader: {
		minimize: true,
		removeAttributeQuotes: false,
		caseSensitive: true,
		customAttrSurround: [
			[/#/, /(?:)/],
			[/\*/, /(?:)/],
			[/\[?\(?/, /(?:)/]
		],
		customAttrAssign: [/\)?\]?=/]
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
	 * Plugin: DefinePlugin
	 * Description: Define free variables.
	 * Useful for having development builds with debug logging or adding global constants.
	 *
	 * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
	 */
		new DefinePlugin({
			'ENV': JSON.stringify(ENV),
			'HMR': false,
			'process.env': {
				'ENV': JSON.stringify(ENV),
				'NODE_ENV': JSON.stringify(ENV),
				'HMR': false
			}
		}),

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