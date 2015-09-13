"use strict";

let _ = require('lodash');
let gulp = require('gulp');
let Builder = require('../');

let $ = Builder.Plugins;
let config = Builder.config;
let srcPath = config.getPath('root.assets.css.folder') + '/**/*.css';
let publicPath = config.getPath('root.public.css.outputFolder');

let stylesTask = function() {
    let name = _.capitalize(this.name);

    this.log(srcPath, publicPath);

    return (
        gulp
            .src(srcPath)
            .pipe($.if(config.get('sourcemaps'), $.sourcemaps.init()))
            .pipe($.concat(config.get('css.styles.concatFilename')))
            .pipe($.if(config.get('production'), $.minifyCss()))
            .pipe($.if(config.get('sourcemaps'), $.sourcemaps.write()))
            .pipe(gulp.dest(publicPath))
            .pipe(new Builder.Notification(name + ' concatenated!'))
    );
};

Builder
    .addTask('styles', stylesTask)
    .watch(srcPath)
    .order(6)
    .parallel(true);