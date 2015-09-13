var gulp = require('gulp');
var path = require('path');
var Builder = require('../');

var $ = Builder.Plugins;
var config = Builder.config;

/**
 * Update asset references with revisioned filenames in compiled css + js
 */
gulp.task('revision:replace', function () {
    var outputFolder = config.getPath('root.public'),
        manifest = gulp.src(
            path.join(
                config.getPath('root.public.versioning.buildFolder'),
                'rev-manifest.json'
            )
        );

    gulp
        .src(path.join(outputFolder, '**/*.{css,js}'))
        .pipe($.revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest(outputFolder));

});