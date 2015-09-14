"use strict";

let gulp = require('gulp');
let Builder = require('../');
let inSequence = require('run-sequence');

/**
 * Execute bunch of revision tasks
 *
 * @param done
 */
let revisionTask = function(done) {
    let args = [];

    args.push(
        'revision:css',
        'revision:replace',
        'revision:report'
    );

    args.push(done);

    inSequence.apply(this, args);
};

Builder
    .addTask('revision', revisionTask)
    .production(true);