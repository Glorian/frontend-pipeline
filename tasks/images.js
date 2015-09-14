"use strict";

let _ = require('lodash');
let gulp = require('gulp');
let Builder = require('../');
let pngquant = require('imagemin-pngquant');

let $ = Builder.Plugins;
let config = Builder.config;
let srcPath = `${config.getPath('root.assets.images.folder')}/**/*.+(jpeg|jpg|png|gif|svg)`;
let outputPath = config.getPath('root.public.images.outputFolder');

/**
 * Optimize images
 *
 * @returns {*}
 */
let imagesTask = function() {
    let name = _.capitalize(this.name),
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
            .pipe(new Builder.Notification(`${name} Optimized!`))
    );
};

Builder
    .addTask('images', imagesTask)
    .watch(srcPath)
    .order(3)
    .parallel(true);