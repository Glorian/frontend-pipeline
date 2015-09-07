var gulp = require('gulp');
var _ = require('lodash');
var Builder = require('../');
var inSequence = require('run-sequence');
var taskSequence = require('../lib/taskSequence');

gulp.task('default', function (cb) {
    var args = taskSequence(Builder.tasks);

    args.push(cb);

    inSequence.apply(this, args);
});