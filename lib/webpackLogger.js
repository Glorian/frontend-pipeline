var gutil 			= require('gulp-util');
var prettifyTime 	= require('./prettifyTime');
var handleErrors 	= require('./handleErrors.js');
var Builder			= require('../');

/**
 * Helper: External logger for Webpack
 *
 * @param err
 * @param stats
 */
var Helper = function(err, stats) {
    if (err) {
        throw new gutil.PluginError('webpack', err);
    }

    var statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow';

    if (stats.compilation.errors.length > 0) {
        stats.compilation.errors.forEach(function(error) {
            handleErrors(error);
            statColor = 'red';
        });
    } else {
        var compileTime = prettifyTime(stats.endTime - stats.startTime);

        Builder.Log.message(gutil.colors[statColor](stats));
        Builder.Log.message('Compiled with ' + gutil.colors.cyan('webpack') + ' in ' + gutil.colors.magenta(compileTime));
    }
};

module.exports = Helper;