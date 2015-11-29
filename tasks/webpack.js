"use strict";

const _ = require('lodash');
let gulp = require('gulp');
let logger = require('../lib/webpackLogger');
let Builder = require('../');
let webpack = require('webpack');

/**
 * Webpack compiler task
 *
 * @param done
 */
let webpackTask = function(done) {
    const name = _.capitalize(this.name),
        compiler = webpack(Builder.config.get('js.webpack')),
        watch = !!Builder.config.get('js.webpack.watching');

    let webpackCallback = (err, stats) => {
        logger(name, err, stats);

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