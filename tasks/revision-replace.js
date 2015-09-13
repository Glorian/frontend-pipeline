"use strict";

let gulp = require('gulp');
let path = require('path');
let Builder = require('../');

let $ = Builder.Plugins;
let config = Builder.config;

/**
 * Update asset references with revisioned filenames in compiled css + js
 */
gulp.task('revision:replace', function() {
    let outputFolder = config.getPath('root.public'),
        manifest = gulp.src(
            path.join(
                config.getPath('root.public.versioning.buildFolder'),
                'rev-manifest.json'
            )
        );

    return (
        gulp
            .src(path.join(outputFolder, '**/*.{css,js}'))
            .pipe($.revReplace({
                manifest: manifest
            }))
            .pipe(gulp.dest(outputFolder))
    );

});