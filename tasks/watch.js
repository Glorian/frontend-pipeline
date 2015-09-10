var gulp = require('gulp');
var _ = require('lodash');
var Builder = require('../');
var $ = Builder.Plugins;

gulp.task('watch', function() {
    var tasks = _.sortBy(Builder.tasks, 'name');
    var mergedTasks = {};

    if (isWatchingWebpack(tasks)) {
        Builder.config.set('js.webpack.watching', true);

        gulp.start('webpack');
    }

    tasks.forEach(function(task) {
        if (task.name == 'webpack') return;

        if (task.name in mergedTasks) {
            return mergedTasks[task.name].watchers = _.union(mergedTasks[task.name].watchers, task.watchers);
        }

        mergedTasks[task.name] = {
            name: task.name,
            watchers: Array.isArray(task.watchers) ? task.watchers : [task.watchers]
        };
    });

    _.sortBy(mergedTasks, 'name').forEach(function(task) {
        if (task.watchers.length > 0) {
            $.watch(task.watchers, $.batch(Builder.config.get('batchOptions'), function(events) {
                events.on('end', gulp.start(task.name));
            }));
        }
    });
});

var isWatchingWebpack = function(tasks) {
    var webpackTask = _.find(tasks, 'name', 'webpack');

    if (webpackTask) {
        return webpackTask.watchers.length;
    }

    return false;
};