var gulp = require('gulp');
var _ = require('lodash');
var Builder = require('../');
var pngquant = require('imagemin-pngquant');

var $ = Builder.Plugins;
var config = Builder.config;
var srcPath = config.getPath('assets.images.folder') + '/**/*.+(jpeg|jpg|png|gif|svg)';
var outputPath = config.getPath('public.images.outputFolder');

/**
 * Optimize images
 *
 * @returns {*}
 */
var imagesTask = function () {
    var name = _.capitalize(this.name),
        options = config.get('images.options');

    this.log(srcPath, outputPath);

    // Add some optimization plugins
    options.use = [
        pngquant(config.get('images.plugins.pngquant'))
    ];

    return (
        gulp
            .src(srcPath)
            .pipe($.changed(outputPath)) // Ignore unchanged files
            .pipe($.imagemin(options)) // Optimize
            .pipe(gulp.dest(outputPath))
            .pipe(new Builder.Notification(name + ' Optimized!'))
    );
};

Builder
    .addTask('images', imagesTask)
    .watch(srcPath)
    .order(3)
    .parallel(true);