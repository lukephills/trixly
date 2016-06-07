const gulp = require('gulp');
const runKarma  = require('../util/runKarma');

gulp.task('test:chrome', runKarma('Chrome', true));