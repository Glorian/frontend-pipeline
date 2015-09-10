var gulp = require('gulp');
var Builder = require('../');
var del = require('del');

var cleanTask = function(done) {
    return (
        del(Builder.config.get('publicPath'), done)
    );
};

Builder
    .addTask('clean', cleanTask)
    .order(1);