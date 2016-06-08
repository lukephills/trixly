const path = require('path');
const helpers = require('./config');


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
		root: helpers.root('src'),
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
				exclude: [helpers.root('node_modules')]
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
					helpers.root('node_modules/rxjs'),
					helpers.root('node_modules/@angular')
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
		 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
		 *
		 * See: https://github.com/s-panferov/awesome-typescript-loader
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
				include: helpers.root('src'),
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
	 * Environment helpers
	 *
	 * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
	 */
		// NOTE: when adding more properties make sure you include them in custom-typings.d.ts
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
	 * Static analysis linter for TypeScript advanced options configuration
	 * Description: An extensible linter for the TypeScript language.
	 *
	 * See: https://github.com/wbuchwalter/tslint-loader
	 */
	tslint: {
		configuration: {
			rules: {
				"align": false,
				"ban": false,
				"class-name": true,
				"comment-format": [
					true,
					"check-space"
				],
				"curly": true,
				"eofline": false,
				"forin": true,
				"indent": [true,
					"spaces"
				],
				"jsdoc-format": true,
				"label-position": true,
				"label-undefined": true,
				"max-line-length": [
					true,
					140
				],
				"member-access": true,
				"member-ordering": [
					true,
					"public-before-private",
					"static-before-instance",
					"variables-before-functions"
				],
				"new-parens": true,
				"no-angle-bracket-type-assertion": true,
				"no-any": false,
				"no-arg": true,
				"no-bitwise": true,
				"no-conditional-assignment": true,
				"no-consecutive-blank-lines": false,
				"no-console": [
					true,
					"debug",
					"info",
					"time",
					"timeEnd",
					"trace"
				],
				"no-construct": true,
				"no-constructor-vars": true,
				"no-debugger": true,
				"no-duplicate-key": true,
				"no-duplicate-variable": true,
				"no-empty": true,
				"no-eval": true,
				"no-inferrable-types": false,
				"no-internal-module": true,
				"no-invalid-this": [
					true,
					"check-function-in-method"
				],
				"no-null-keyword": false,
				"no-reference": true,
				"no-require-imports": true,
				"no-shadowed-variable": true,
				"no-string-literal": true,
				"no-switch-case-fall-through": false,
				"no-trailing-whitespace": true,
				"no-unreachable": true,
				"no-unused-expression": true,
				"no-unused-variable": true,
				"no-use-before-declare": true,
				"no-var-keyword": true,
				"no-var-requires": true,
				"object-literal-sort-keys": true,
				"one-line": [
					true,
					"check-open-brace",
					"check-catch",
					"check-else",
					"check-finally",
					"check-whitespace"
				],
				"one-variable-per-declaration": [true,
					"ignore-for-loop"
				],
				"quotemark": [
					true,
					"single",
					"avoid-escape"
				],
				"radix": true,
				"semicolon": [true, "always"],
				"switch-default": true,
				"trailing-comma": [
					true,
					{
						"multiline": "never",
						"singleline": "never"
					}
				],
				"triple-equals": [
					true,
					"allow-null-check"
				],
				"typedef": [
					true,
					"call-signature",
					"parameter",
					"arrow-parameter",
					"property-declaration",
					"variable-declaration",
					"member-variable-declaration"
				],
				"typedef-whitespace": [
					true,
					{
						"call-signature": "nospace",
						"index-signature": "nospace",
						"parameter": "nospace",
						"property-declaration": "nospace",
						"variable-declaration": "nospace"
					},
					{
						"call-signature": "space",
						"index-signature": "space",
						"parameter": "space",
						"property-declaration": "space",
						"variable-declaration": "space"
					}
				],
				"use-isnan": true,
				"use-strict": [
					true,
					"check-module"
				],
				"variable-name": [
					true,
					"check-format",
					"allow-leading-underscore",
					"ban-keywords"
				],
				"whitespace": [
					true,
					"check-branch",
					"check-decl",
					"check-operator",
					"check-separator",
					"check-type"
				]
			}
		},
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