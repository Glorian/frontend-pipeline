var path = require('path');
var gutils = require('gulp-util');
var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var ManifestWebpack = require('../../lib/webpackManifest');

/**
 * Configuration partial for Webpack module
 *
 * @param Config
 */
var partial = function (Config) {
    var production = Config.get('production');
    var filename = production ? '[name]-[hash].js' : '[name].js';
    var loaders = {
        babel: JSON.stringify(Config.get('js.loaders.babel.options'))
    };

    var webpackConfig = {
        context: path.resolve(Config.getPath('assets.js.folder')),
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: filename,
            }),
            new BowerWebpackPlugin({
                excludes: [/.*\.less$/, /^.+\/[^\/]+\/?\*$/]
            }),
            new webpack.ProvidePlugin(Config.get('js.globalVars'))
        ],
        resolve: {
            extensions: ['', '.js']
        },
        entry: {
            vendor: Config.get('js.defaultVendors'),
            bundle: Config.get('js.entry')
        },
        output: {
            path: Config.getPath('public.js.outputFolder'),
            filename: filename,
            publicPath: Config.get('js.outputFolder')
        },
        resolveLoader: {
            root: path.join(path.dirname(module.filename), '../..', 'node_modules')
        },
        module: {
            loaders: [
                {
                    test: Config.get('js.loaders.babel.pattern'),
                    loader: 'babel?' + loaders.babel,
                    exclude: Config.get('js.loaders.babel.exclude')
                },
                {test: /.(css|scss)$/, loader: 'style!css!sass'},
                {test: /.(woff|woff2|svg|ttf|eot)([\?]?.*)$/, loader: 'file?name=[name].[ext]'},
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                        'file?hash=sha512&digest=hex&name=[hash].[ext]',
                        'image-webpack?{bypassOnDebug: true, progressive: true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                    ]
                }
            ]
        }
    };

    if (!!gutils.env.testing) {
        delete webpackConfig.entry;
        delete webpackConfig.output;

        webpackConfig.plugins = [];
    }

    /**
     * If Development Environment
     */
    if (!production) {
        webpackConfig.devtool = 'source-map';
        webpack.debug = true;
    }

    /**
     * If Production Environment
     */
    if (production) {
        webpackConfig.plugins.push(
            new ManifestWebpack({
                publicPath: Config.get('js.outputFolder'),
                dest: path.join(Config.get('publicPath'), Config.get('versioning.buildFolder'))
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.NoErrorsPlugin()
        )
    }

    return {
        js: {
            webpack: webpackConfig
        }
    };
};

module.exports = partial;