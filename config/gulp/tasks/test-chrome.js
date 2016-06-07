const gulp = require('gulp');
const runKarma  = require('../util/runKarma');
console.log(runKarma)

gulp.task('test:chrome', runKarma(true, {
		singleRun: true,
		browsers: ['Chrome']
	}
));