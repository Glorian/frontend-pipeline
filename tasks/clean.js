var gulp = require('gulp');
var p = require('path');
var Builder = require('../');
var del = require('del');

var config = Builder.config;

var cleanTask = function (done) {
    var cleanDir = config.getPath('root.public'),
        finalPath = config.get('cleanOptions.contentOnly')
            ? p.join(cleanDir, '**')
            : cleanDir;

    return del(finalPath, done);
};

Builder
    .addTask('clean', cleanTask)
    .order(1);