var gulp 	= require('gulp');
var _ 		= require('lodash');
var config;

/**
 * Set Builder constructor
 *
 * @constructor
 */
var Builder = function() {};

Builder.config 			= config = require('./Config');
Builder.Log 			= require('./Logger');
Builder.Notification 	= require('./Notification');
Builder.Task 			= require('./Task')(Builder);
Builder.tasks 			= config.get('tasks');
Builder.Plugins 		= require('gulp-load-plugins')();

/**
 * Execute Builder
 */
Builder.start = function() {
	require('require-dir')('./tasks', { recurse: true });

	runTasks.call(Builder);
};

/**
 * Add new task to Builder queue
 *
 * @param name
 * @param callback
 * @returns {*}
 */
Builder.addTask = function(name, callback) {
 	return new Builder.Task(name, callback);
};

/**
 * Helper function for exporting all tasks to Gulp
 */
var runTasks = function() {
	var tasks = this.tasks;

	tasks.forEach(function(task) {
		if(_.contains(gulp.task, task.name)) return;

		gulp.task(task.name, function() {
            return Builder.Task.find(task.name).run();
		});
	});
};

module.exports = Builder;