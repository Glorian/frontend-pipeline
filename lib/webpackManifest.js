var path        = require('path');
var fs          = require('fs');
var _           = require('lodash');

module.exports = function (options) {
    options = _.assign({
        publicPath: '',
        dest: '',
        filename: 'rev-manifest.json'
    }, options || {});

    return function () {
        this.plugin("done", function (stats) {
            var chunks = stats.toJson().assetsByChunkName;
            var manifest = {};

            for (var key in chunks) {
                manifest[path.join(options.publicPath, key + '.js')] = path.join(options.publicPath, chunks[key]);
            }

            if (!fs.existsSync(path.resolve(options.dest))) {
                fs.mkdirSync(path.resolve(options.dest));
            }

            fs.writeFileSync(
                path.join(path.resolve(options.dest), options.filename),
                JSON.stringify(manifest, null, '  ')
            );
        });
    };
};
