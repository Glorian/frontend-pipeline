"use strict";

let gulp = require('gulp');
let _ = require('lodash');

/**
 * Main Builder class
 */
class Builder {

    /**
     * @constructor
     */
    constructor() {
        this.config = require('./Config');
        this.Log = require('./Logger');
        this.Notification = require('./Notification');
        this.Task = require('./Task')(this);
        this.tasks = this.config.get('tasks');
        this.Plugins = require('gulp-load-plugins')();
    }

    /**
     * Execute Builder
     */
    start() {
        require('require-dir')('./tasks/', {
            recurse: true
        });

        this.tasks.forEach(task => {
            if (_.contains(gulp.task, task.name)) return;

            gulp.task(task.name, done => {
                return this.Task.find(task.name).run(done);
            });
        });
    }

    /**
     * Create new custom gulp task
     *
     * @param {string} name
     * @param {function} callback
     * @returns {*}
     */
    addTask(name, callback) {
        return new this.Task(name, callback);
    }
}

module.exports = new Builder;