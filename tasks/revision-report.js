var gulp = require('gulp');
var path = require('path');
var _ = require('lodash');
var Builder = require('../');

var $ = Builder.Plugins;
var config = Builder.config;

gulp.task('revision:report', function() {
    var files = '/**/*-' + _.repeat('[a-z,0-9]', 8) + '*.*';

    gulp
        .src([config.get('publicPath') + files, '!./**/rev-manifest.json'])
        .pipe($.sizereport({
            gzip: true
        }));
});