var gutils = require('gulp-util');

/**
 *  Default configuration for Builder module
 */
var config = {
    tasks: [],
    production: !!gutils.env.production,
    rootPath: '',
    assetsPath: 'assets',
    publicPath: 'public',
    sourcemaps: true,
    batchOptions: {
        limit: undefined,
        timeout: 1000
    },
    cleanOptions: {
        contentOnly: true
    },
    fonts: {
        folder: 'fonts',
        outputFolder: 'fonts'
    },
    images: {
        folder: 'images',
        outputFolder: 'images',

        plugins: {
            pngquant: {
                quality: '65-90',
                speed: 4
            }
        },

        options: {
            progressive: true,
            interlaced: true,
            multipass: true
        }
    },
    css: {
        folder: 'css',
        outputFolder: 'css',
        autoprefix: {
            enabled: true,

            options: {
                browsers: ['last 2 versions'],
                cascade: false
            }
        },
        styles: {
            concatFilename: 'styles.css'
        },
        sass: {
            folder: 'sass',

            options: {
                outputStyle: gutils.env.production
                    ? 'compressed'
                    : 'nested'
            }
        },
        less: {
            folder: 'less',

            options: {}
        }
    },
    js: {
        folder: 'js',
        outputFolder: 'js',
        defaultVendors: [],
        entry: ['./app'],
        globalVars: {},
        loaders: {
            babel: {
                pattern: /\.js$/,
                exclude: [
                    /node_modules/,
                    /bower_components/
                ],

                options: {
                    stage: 2,
                    compact: true
                }
            }
        }
    },
    testing: {
        phpUnit: {
            path: 'tests',

            options: {
                debug: true,
                notify: true
            }
        },
        phpSpec: {
            path: 'spec',
            options: {
                verbose: 'v',
                notify: true
            }
        }
    },
    versioning: {
        buildFolder: 'build'
    }
};

module.exports = config;