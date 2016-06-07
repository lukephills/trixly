const gulp = require('gulp');
const fs  = require( 'fs');
const path = require('path');

const tasks = fs.readdirSync('./config/gulp/tasks/').filter(function(name) {
	return /(\.(js)$)/i.test(path.extname(name))
});

tasks.forEach(function(task) {
	require('./tasks/' + task);
});