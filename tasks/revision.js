var gulp        = require('gulp');
var Builder     = require('../');
var inSequence  = require('run-sequence');

gulp.task('revision', function() {
    var args = [];

    args.push('revision:css');
    args.push('revision:replace');
    args.push('revision:report');

    inSequence.apply(this, args);
});