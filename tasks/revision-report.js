var gulp        = require('gulp');
var path        = require('path');
var Builder     = require('../');
var repeatStr   = require('../lib/strRepeat');

var $           = Builder.Plugins;
var config      = Builder.config;

gulp.task('revision:report', function () {
    var files = '/**/*-' + repeatStr('[a-z,0-9]', 8) + '*.*';

    gulp
        .src([config.get('publicPath') + files, '!./**/rev-manifest.json'])
        .pipe($.sizereport({
            gzip: true
        }));
});