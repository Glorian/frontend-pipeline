"use strict";

let _ = require('lodash');
let gulp = require('gulp');
let Builder = require('../');

let $ = Builder.Plugins;
let config = Builder.config;
let srcPath = `${config.getPath('root.assets.html.folder')}/**/*.html`;
let outputPath = config.getPath('root.public');

/**
 * Copy all fonts to public directory
 *
 * @returns {*}
 */
var htmlTask = function() {
    let name = _.capitalize(this.name);

    this.log(srcPath, outputPath);

    return (
        gulp
            .src(srcPath)
            .pipe($.changed(outputPath)) // Ignore unchanged files
            .pipe(gulp.dest(outputPath))
            .pipe(new Builder.Notification(name + ' Copied!'))
    );
};

Builder
    .addTask('html', htmlTask)
    .watch(srcPath)
    .order(7)
    .parallel(true)
    .group(true);