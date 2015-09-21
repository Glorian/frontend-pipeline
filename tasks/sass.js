"use strict";

let _ = require('lodash');
let gulp = require('gulp');
let Builder = require('../');
let errorsHandler = require('../lib/handleErrors');

let $ = Builder.Plugins;
let config = Builder.config;
let srcPath = config.getPath('root.assets.css.sass.folder') + '/**/*.+(sass|scss)';
let outputPath = config.getPath('root.public.css.outputFolder');

/**
 * Compile sass styles
 *
 * @returns {*}
 */
let sassTask = function() {
    let name = _.capitalize(this.name);

    this.log(srcPath, outputPath);

    return (
        gulp
            .src(srcPath)
            .pipe($.plumber(error => errorsHandler(error, name)))
            .pipe($.if(config.get('sourcemaps'), $.sourcemaps.init()))
            .pipe($.sass.sync(config.get('css.sass.options')))
            .pipe($.if(config.get('css.autoprefix.enabled'), $.autoprefixer(config.get('css.autoprefix.options'))))
            .pipe($.if(config.get('production'), $.minifyCss()))
            .pipe($.if(config.get('sourcemaps'), $.sourcemaps.write()))
            .pipe(gulp.dest(outputPath))
            .pipe(new Builder.Notification(`${name} Compiled!`))
    );
};

Builder
    .addTask('sass', sassTask)
    .watch(srcPath)
    .order(4)
    .parallel(true)
    .group(true);