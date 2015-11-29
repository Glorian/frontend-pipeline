"use strict";

const gutil = require('gulp-util');

/**
 * Helper: External logger for Webpack
 *
 * @param taskName
 * @param err
 * @param stats
 */
module.exports = (taskName, err, stats) => {
    if (err) {
        throw new gutil.PluginError(taskName, err);
    }

    gutil.log(taskName, stats.toString({
        colors: true
    }));
};