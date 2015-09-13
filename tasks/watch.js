"use strict";

let _ = require('lodash');
let gulp = require('gulp');
let Builder = require('../');

let $ = Builder.Plugins;
let config = Builder.config;

gulp.task('watch', function() {
    let tasks = _.sortBy(Builder.tasks, 'name'),
        mergedTasks = {};

    if (isWatchingWebpack(tasks)) {
        config.set('js.webpack.watching', true);

        gulp.start('webpack');
    }

    tasks.forEach(task => {
        if (task.name == 'webpack') return;

        if (task.name in mergedTasks) {
            return mergedTasks[task.name].watchers = _.union(mergedTasks[task.name].watchers, task.watchers);
        }

        mergedTasks[task.name] = {
            name: task.name,
            watchers: Array.isArray(task.watchers) ? task.watchers : [task.watchers]
        };
    });

    _.sortBy(mergedTasks, 'name').forEach(task => {
        if (task.watchers.length > 0) {
            $.watch(
                task.watchers,
                $.batch(
                    config.get('batchOptions'),
                    events => events.on('end', gulp.start(task.name))
                )
            );
        }
    });
});

let isWatchingWebpack = tasks => {
    let webpackTask = _.find(tasks, 'name', 'webpack');

    if (webpackTask) {
        return webpackTask.watchers.length;
    }

    return false;
};