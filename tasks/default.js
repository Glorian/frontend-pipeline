"use strict";

let _ = require('lodash');
let gulp = require('gulp');
let Builder = require('../');
let inSequence = require('run-sequence');
let taskSequence = require('../lib/taskSequence');

gulp.task('default', function(done) {
    let args = taskSequence(Builder.tasks);

    args.push(done);

    inSequence.apply(this, args);
});