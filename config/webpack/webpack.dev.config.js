const webpack = require('webpack');
const postcssNext = require('postcss-cssnext');
const postcssAssets = require('postcss-assets');
const banner = require('../banner');
const ROOT = require('../root');

/**
 * Webpack Plugins
 */
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = {

	entry: ROOT('src'),
	cache: true,
	/**
	 * Switch loaders to debug mode.
	 *
	 * See: http://webpack.github.io/docs/configuration.html#debug
	 */
	debug: true,

	/**
	 * Developer tool to enhance debugging
	 *
	 * See: http://webpack.github.io/docs/configuration.html#devtool
	 * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
	 */
	devtool: 'cheap-module-source-map',

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
		filename: 'trixly.js',

		/**
		 * The filename of the SourceMaps for the JavaScript files.
		 * They are inside the output.path directory.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
		 */
		sourceMapFilename: 'trixly.map',
		libraryTarget: 'umd'
	},

	resolve: {
		/*
		 * An array of extensions that should be used to resolve modules.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
		 */
		extensions: ['', '.ts', '.tsx', '.js'],

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
			{ test: /\.ts(x?)$/, loader: 'tslint-loader', exclude: [ ROOT('node_modules') ] },


			/*
			 * Source map loader support for *.js files
			 * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
			 *
			 * See: https://github.com/webpack/source-map-loader
			 */
			{
				test: /\.ts(x?)$/,
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
				test: /\.ts(x?)$/,
				loader: 'babel-loader!awesome-typescript-loader',
				exclude:  [/\.(spec|e2e|async)\.ts$/]
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
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!less?sourceMap')
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
			},
			/*
			 * File loader
			 *
			 * See: https://github.com/webpack/file-loader
			 */
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
				loader: 'url-loader?limit=20000'
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
			{ test: /\.html$/,  loader: 'raw' }
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
		/*
		 * Plugin: ForkCheckerPlugin
		 * Description: Do type checking in a separate process, so webpack don't need to wait.
		 *
		 * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
		 */
		new ForkCheckerPlugin(),

		new DefinePlugin({
			'ENV': JSON.stringify(ENV),
			'process.env': {
				'ENV': JSON.stringify(ENV),
				'NODE_ENV': JSON.stringify(ENV),
			}
		}),

		/*
		 * Plugin: HotModuleReplacementPlugin
		 * Description: Adds webpack HMR support. It act's like livereload,
		 * reloading page after webpack rebuilt modules.
		 * It also updates stylesheets and inline assets without page reloading.
		 */

		new webpack.HotModuleReplacementPlugin(),
		/*
		 * Plugin: OccurenceOrderPlugin
		 * Description: Varies the distribution of the ids to get the smallest id length
		 * for often used ids.
		 *
		 * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
		 * See: https://github.com/webpack/docs/wiki/optimization#minimize
		 */
		new webpack.optimize.OccurenceOrderPlugin(true),

	/**
	 * Plugin: DedupePlugin
	 * Description: Prevents the inclusion of duplicate code into your bundle
	 * and instead applies a copy of the function at runtime.
	 *
	 * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
	 * See: https://github.com/webpack/docs/wiki/optimization#deduplication
	 */
		new webpack.optimize.DedupePlugin(),
	/**
	 * Plugin: ExtractTextPlugin
	 * Description: Extract text from bundle into a file.
	 *
	 * Reference: https://github.com/webpack/extract-text-webpack-plugin
	 */

		new ExtractTextPlugin('trixly.css'),
		new webpack.BannerPlugin(banner(), {raw: true})
	],
	/**
	 * PostCSS
	 * Reference: https://github.com/postcss/autoprefixer-core
	 * Add vendor prefixes to your css
	 */
	postcss: () => [postcssNext(), postcssAssets({ relative: true })],
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