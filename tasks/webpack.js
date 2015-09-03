var gulp = require('gulp');
var Builder = require('../');
var webpack = require('webpack');
var logger = require('../lib/webpackLogger');

Builder.addTask('webpack', function() {
    var compiler = webpack(Builder.config.get('js.webpack'));
    var watch = !! Builder.config.get('js.webpack.watching');

    watch
        ? compiler.watch(100, logger)
        : compiler.run(logger);
})
.watch();