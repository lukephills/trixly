const gulp = require('gulp');
const watch = require('../util/watchIt');

gulp.task('watch', watch('build:dev'));