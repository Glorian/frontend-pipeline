var gulp = require('gulp');
var _ = require('lodash');
var Builder = require('../');
var inSequence = require('run-sequence');

gulp.task('default', function() {
    var args = [];

    args.push('clean');
    args.push(_.pluck(Builder.tasks, 'name'));

    inSequence.apply(this, args);
});