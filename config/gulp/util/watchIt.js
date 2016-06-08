const gulp = require('gulp');
const browserSync = require('browser-sync');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const path = require('path');

/**
 * Watches the task with the given taskname.
 * @param {string} taskname - The name of the task.
 */

function notifyLiveReload(e) {
	let files = e.path;
	if (!(files instanceof Array)) {
		files = [files];
	}

	browserSync.reload(files)
}




function watchIt(taskname) {

	let paths = [
		path.join('src/**')
	].concat([
		'**/*___jb_tmp___',
		'**/*~'
	].map((p) => { return '!'+p; }));

	watch(paths, function(e) {

		runSequence(taskname, function() {
				return notifyLiveReload(e)
		});
	});
}

module.exports = watchIt;