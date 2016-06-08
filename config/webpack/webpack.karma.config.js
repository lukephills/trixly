const path = require('path');
const ROOT = path.join(__dirname, '/../../');


/**
 * Webpack Plugins
 */

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';
/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
	/**
	 * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
	 *
	 * Do not change, leave as is or it wont work.
	 * See: https://github.com/webpack/karma-webpack#source-maps
	 */
	devtool: 'inline-source-map',
	/**
	 * Options affecting the resolving of modules.
	 *
	 * See: http://webpack.github.io/docs/configuration.html#resolve
	 */
	resolve: {
		/**
		 * An array of extensions that should be used to resolve modules.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
		 */
		extensions: ['', '.ts', '.js', '.tsx', '.jsx'],
		/**
		 * Make sure root is src
		 */
		root: path.join(ROOT, 'src')
	},
	/**
	 * Options affecting the normal modules.
	 *
	 * See: http://webpack.github.io/docs/configuration.html#module
	 */
	module: {
		/**
		 * An array of applied pre and post loaders.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
		 */
		preLoaders: [
		/**
		 * Tslint loader support for *.ts files
		 *
		 * See: https://github.com/wbuchwalter/tslint-loader
		 */
			{
				test: /\.ts$/,
				loader: 'tslint-loader',
				exclude: [path.join(ROOT, 'node_modules')]
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
					path.join(ROOT, 'node_modules/rxjs'),
					path.join(ROOT, 'node_modules/@angular')
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
				exclude: [/\.e2e\.ts$/]
			}
		],
		/**
		 * An array of applied pre and post loaders.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
		 */
		postLoaders: [
		/**
		 * Instruments JS files with Istanbul for subsequent code coverage reporting.
		 * Instrument only testing sources.
		 *
		 * See: https://github.com/deepsweet/istanbul-instrumenter-loader
		 */
			{
				test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
				include: path.join(ROOT, 'src'),
				exclude: [
					/\.(e2e|spec)\.ts$/,
					/node_modules/
				]
			}
		]
	},
	/**
	 * Add additional plugins to the compiler.
	 *
	 * See: http://webpack.github.io/docs/configuration.html#plugins
	 */
	plugins: [
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
		})
	],
	/**
	 * TSLint decreases bikeshedding and increases maintainability with
	 * advanced option configuration.
	 *
	 * See: https://github.com/wbuchwalter/tslint-loader
	 */
	tslint: {
		// Rules are in tslint.json
		emitErrors: false,
		failOnHint: false,
		resourcePath: 'src'
	},
	/**
	 * Include polyfills or mocks for various node stuff
	 * Description: Node configuration
	 *
	 * See: https://webpack.github.io/docs/configuration.html#node
	 */
	node: {
		global: 'window',
		process: false,
//        crypto: 'empty', // deprecated
		module: false,
		clearImmediate: false,
		setImmediate: false
	}
};