var gulp = require('gulp');
var path = require('path');
var Builder = require('../');
var vinylPath = require('vinyl-paths');
var del = require('del');

var $ = Builder.Plugins;
var config = Builder.config;

gulp.task('revision:css', function(cb) {
    var outputFolder = config.get('publicPath');
    var cssFiles = vinylPath();

    return (
        gulp
        .src(outputFolder + '/**/*.css')
        .pipe(cssFiles)
        .pipe($.rev())
        .pipe(gulp.dest(outputFolder))
        .pipe($.rev.manifest(
            path.join(
                config.getPath('public.versioning.buildFolder'),
                'rev-manifest.json'
            ), {
                merge: true
            }
        ))
        .pipe(gulp.dest(''))
        .on('end', function() {
            del(cssFiles.paths, cb);
        })
    );

});