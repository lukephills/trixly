const gulp = require('gulp');
const plumber = require('gulp-plumber');
const tslint = require('gulp-tslint');
const stylish = require('gulp-tslint-stylish');

function lint(files) {
	return gulp.src(files)
		.pipe(tslint())
		.pipe(tslint.report(stylish, {
			emitError: false,
			sort: true,
			bell: true,
			fullPath: true
		}));
}

module.exports = lint;