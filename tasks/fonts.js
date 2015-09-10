var gulp = require('gulp');
var _ = require('lodash');
var Builder = require('../');

var $ = Builder.Plugins;
var config = Builder.config;
var srcPath = config.getPath('assets.fonts.folder') + '/**/*.+(woff|woff2|ttf|eot|svg)';
var outputPath = config.getPath('public.fonts.outputFolder');

/**
 * Copy all fonts to public directory
 *
 * @returns {*}
 */
var fontsTask = function() {
    var name = _.capitalize(this.name);

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
    .addTask('fonts', fontsTask)
    .watch(srcPath)
    .order(2)
    .parallel(true)
    .group(true);