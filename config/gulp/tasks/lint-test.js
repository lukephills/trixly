const gulp = require('gulp');
const lint = require('../util/lint');

// Lint the test files
gulp.task('lint:test', function() { lint('test/**/*.ts')});
