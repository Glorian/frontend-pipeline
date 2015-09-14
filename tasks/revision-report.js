"use strict";

let _ = require('lodash');
let gulp = require('gulp');
let path = require('path');
let Builder = require('../');

let $ = Builder.Plugins;
let config = Builder.config;

gulp.task('revision:report', function() {
    let files = `**/*-${_.repeat('[a-z,0-9]', 8)}*.*`;

    return (
        gulp
            .src([
                path.join(config.getPath('root.public'), files),
                '!./**/rev-manifest.json'
            ])
            .pipe($.sizereport({
                gzip: true
            }))
    );

});