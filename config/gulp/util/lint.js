import gulp from 'gulp';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';

function lint(files) {
	return gulp.src(files)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
}

export default lint;