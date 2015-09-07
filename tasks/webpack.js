var gulp = require('gulp');
var webpack = require('webpack');
var logger = require('../lib/webpackLogger');
var Builder = require('../');

/**
 * Webpack compiler task
 *
 * @param done
 */
var webpackTask = function (done) {
    var compiler = webpack(Builder.config.get('js.webpack')),
        watch = !!Builder.config.get('js.webpack.watching');

    var webpackCallback = function (err, stats) {
        logger(err, stats);

        !watch && done();
    };

    watch
        ? compiler.watch(100, webpackCallback)
        : compiler.run(webpackCallback);
};

/**
 * Push webpack task to gulp tasks queue
 * and make it watchable
 */
Builder
    .addTask('webpack', webpackTask)
    .watch(true)
    .order(5)
    .parallel(true);