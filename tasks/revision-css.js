"use strict";

let del = require('del');
let gulp = require('gulp');
let path = require('path');
let Builder = require('../');
let vinylPath = require('vinyl-paths');

let $ = Builder.Plugins;
let config = Builder.config;

gulp.task('revision:css', function(done) {
    let outputFolder = config.get('rootPath')
            ? config.get('rootPath')
            : config.get('publicPath'),
        cssFiles = vinylPath();

    return (
        gulp
            .src(path.join(outputFolder, '**/*.css'))
            .pipe(cssFiles)
            .pipe($.rev())
            .pipe(gulp.dest(outputFolder))
            .pipe($.rev.manifest(
                path.join(
                    config.getPath('root.public.versioning.buildFolder'),
                    'rev-manifest.json'
                ),
                {merge: true}
            ))
            .pipe(gulp.dest(''))
            .on('end', () => del(cssFiles.paths, done))
    );

});