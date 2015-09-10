var gulp = require('gulp');
var inSequence = require('run-sequence');
var Builder = require('../');

/**
 * Execute bunch of revision tasks
 *
 * @param done
 */
var revisionTask = function(done) {
    var args = [];

    args.push('revision:css');
    args.push('revision:replace');
    args.push('revision:report');

    args.push(done);

    inSequence.apply(this, args);
};

Builder
    .addTask('revision', revisionTask)
    .dev(true);