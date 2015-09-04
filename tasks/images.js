var gulp        = require('gulp');
var Builder     = require('../');
var Capitalize  = require('../lib/capitalizeFirstLetter');
var pngquant    = require('imagemin-pngquant');

var $           = Builder.Plugins;
var config      = Builder.config;
var srcPath     = config.getPath('assets.images.folder') + '/**/*.+(jpeg|jpg|png|gif|svg)';
var outputPath  = config.getPath('public.images.outputFolder');

Builder.addTask('images', function () {
    var name = Capitalize(this.name);
    var options = config.get('images.options');

    this.log(srcPath, outputPath);

    // Add some optimization plugins
    options.use = [
        pngquant(config.get('images.plugins.pngquant'))
    ];

    return (
        gulp
            .src(srcPath)
            .pipe($.changed(outputPath)) // Ignore unchanged files
            .pipe($.imagemin(options)) // Optimize
            .pipe(gulp.dest(outputPath))
            .pipe(new Builder.Notification(name + ' Optimized!'))
    );
})
.watch(srcPath);