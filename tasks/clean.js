"use strict";

let del = require('del');
let gulp = require('gulp');
let Builder = require('../');

let config = Builder.config;

let cleanTask = function(done) {
    let cleanDirs = [];

    cleanDirs.push(
        config.getPath('root.public.js.outputFolder'),
        config.getPath('root.public.css.outputFolder'),
        config.getPath('root.public.images.outputFolder'),
        config.getPath('root.public.fonts.outputFolder'),
        config.getPath('root.public') + '/**/*.html'

    );

    return del(cleanDirs, done);
};

Builder
    .addTask('clean', cleanTask)
    .order(1);