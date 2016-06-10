const ROOT = require('../root');
const postcssAssets = require('postcss-assets');
const postcssNext = require('postcss-cssnext');

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
	 * Devtool
	 * Reference: http://webpack.github.io/docs/configuration.html#devtool
	 * Type of sourcemap to use per build type
	 */
	devtool: 'inline-source-map',

	/**
	 * Options affecting the output of the compilation.
	 *
	 * See: http://webpack.github.io/docs/configuration.html#output
	 */
	output: {},

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
		extensions: ['', '.json', '.js', '.ts', '.tsx', '.jsx'],
		/**
		 * Make sure root is src
		 */
		root: ROOT('src')
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

			{ test: /\.less$/, loader:  'css!postcss!less', exclude: [ROOT('src/index.html')] }
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
		 * See:  https://github.com/deepsweet/istanbul-instrumenter-loader
		 */
			{
				test: /\.(js|ts|tsx)$/, loader: 'istanbul-instrumenter-loader',
				include: ROOT('src'),
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
	postcss: () => [postcssNext(), postcssAssets({ relative: true })],
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