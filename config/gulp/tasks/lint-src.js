const gulp = require('gulp');
const lint = require('../util/lint');

// Lint the source files
gulp.task('lint:src', function() { lint('src/**/*.ts')});
