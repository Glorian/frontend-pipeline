"use strict";

let gutil = require('gulp-util');
let Builder = require('../');
let prettifyTime = require('./prettifyTime');
let handleErrors = require('./handleErrors.js');

/**
 * Helper: External logger for Webpack
 *
 * @param err
 * @param stats
 */
let Helper = (err, stats) => {
    if (err) {
        throw new gutil.PluginError('webpack', err);
    }

    let statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow';

    if (stats.compilation.errors.length > 0) {
        stats.compilation.errors.forEach(error => {
            handleErrors(error);
            statColor = 'red';
        });
    } else {
        let compileTime = prettifyTime(stats.endTime - stats.startTime);

        Builder.Log.message(gutil.colors[statColor](stats));
        Builder.Log.message('Compiled with ' + gutil.colors.cyan('webpack') + ' in ' + gutil.colors.magenta(compileTime));
    }
};

module.exports = Helper;