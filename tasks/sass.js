var gulp            = require('gulp');
var errorsHandler   = require('../lib/handleErrors');
var Capitalize      = require('../lib/capitilizeFirstLetter');
var Builder         = require('../');

var $               = Builder.Plugins;
var config          = Builder.config;
var srcPath         = config.getPath('assets.css.sass.folder') + '/**/*.+(sass|scss)';
var outputPath      = config.getPath('public.css.outputFolder');

Builder.addTask('sass', function () {
    var name = Capitalize(this.name);

    this.log(srcPath, outputPath);

    return (
        gulp
            .src(srcPath)
            .pipe($.plumber(function (error) {
                errorsHandler.apply(this, [error, name]);
            }))
            .pipe($.if(config.get('sourcemaps'), $.sourcemaps.init()))
            .pipe($.sass.sync(config.get('css.sass.options')))
            .pipe($.if(config.get('css.autoprefix.enabled'), $.autoprefixer(config.get('css.autoprefix.options'))))
            .pipe($.if(config.get('production'), $.minifyCss()))
            .pipe($.if(config.get('sourcemaps'), $.sourcemaps.write()))
            .pipe(gulp.dest(outputPath))
            .pipe(new Builder.Notification(name + ' Compiled!'))
    );
})
.watch(srcPath);