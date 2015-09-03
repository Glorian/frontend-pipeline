var gulp        = require('gulp');
var Builder     = require('../');
var del         = require('del');

gulp.task('clean', function () {
    del([
        Builder.config.get('publicPath')
    ]);
});