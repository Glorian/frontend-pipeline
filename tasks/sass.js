var gulp = require('gulp');
var _ = require('lodash');
var errorsHandler = require('../lib/handleErrors');
var Builder = require('../');

var $ = Builder.Plugins;
var config = Builder.config;
var srcPath = config.getPath('assets.css.sass.folder') + '/**/*.+(sass|scss)';
var outputPath = config.getPath('public.css.outputFolder');

/**
 * Compile sass styles
 *
 * @returns {*}
 */
var sassTask = function() {
    var name = _.capitalize(this.name);

    this.log(srcPath, outputPath);

    return (
        gulp
        .src(srcPath)
        .pipe($.plumber(function(error) {
            errorsHandler.apply(this, [error, name]);
        }))
        .pipe($.if(config.get('sourcemaps'), $.sourcemaps.init()))
        .pipe($.sass.sync(config.get('css.sass.options')))
        .pipe($.if(config.get('css.autoprefix.enabled'), $.autoprefixer(config.get('css.autoprefix.options'))))
        .pipe($.if(config.get('production'), $.minifyCss()))
        .pipe($.if(config.get('sourcemaps'), $.sourcemaps.write()))
        .pipe(gulp.dest(outputPath))
        .pipe(new Builder.Notification(name + ' Compiled!'))
    );
};

Builder
    .addTask('sass', sassTask)
    .watch(srcPath)
    .order(4)
    .parallel(true)
    .group(true);