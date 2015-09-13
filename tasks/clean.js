var gulp = require('gulp');
var Builder = require('../');
var del = require('del');

var config = Builder.config;

var cleanTask = function (done) {
    var cleanDirs = [];

    cleanDirs.push(
        config.getPath('root.public.js.outputFolder'),
        config.getPath('root.public.css.outputFolder'),
        config.getPath('root.public.images.outputFolder'),
        config.getPath('root.public.fonts.outputFolder')
    );

    return del(cleanDirs, done);
};

Builder
    .addTask('clean', cleanTask)
    .order(1);