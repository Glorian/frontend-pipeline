var gulp        = require('gulp');
var Builder     = require('../');
var Capitalize  = require('../lib/capitilizeFirstLetter');

var $           = Builder.Plugins;
var config      = Builder.config;
var srcPath     = config.getPath('assets.fonts.folder') + '/**/*.+(woff|woff2|ttf|eot|svg)';
var outputPath  = config.getPath('public.fonts.outputFolder');

Builder.addTask('fonts', function () {
    var name = Capitalize(this.name);

    this.log(srcPath, outputPath);

    return (
        gulp
            .src(srcPath)
            .pipe($.changed(outputPath)) // Ignore unchanged files
            .pipe(gulp.dest(outputPath))
            .pipe(new Builder.Notification(name + ' Copied!'))
    );
})
.watch(srcPath);