var gulp = require('gulp');
var _ = require('lodash');
var Builder = require('../');

var $ = Builder.Plugins;
var config = Builder.config;
var srcPath = config.getPath('assets.css.folder') + '/**/*.css';
var publicPath = config.getPath('public.css.outputFolder');

var stylesTask = function() {
    var name = _.capitalize(this.name);

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