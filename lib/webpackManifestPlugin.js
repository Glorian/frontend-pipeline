"use strict";

let _ = require('lodash');
let fs = require('fs');
let path = require('path');

class WebpackManifest {
    constructor(options) {
        this.options = _.assign({
            publicPath: '',
            dest: '',
            filename: 'rev-manifest.json'
        }, options || {});
    }

    apply(compiler) {
        compiler.plugin('done', stats => {
            let chunks = stats.toJson().assetsByChunkName,
                manifest = {};

            for (let key in chunks) {
                manifest[path.join(this.options.publicPath, key + '.js')] = path.join(this.options.publicPath, chunks[key]);
            }

            if (!fs.existsSync(path.resolve(this.options.dest))) {
                fs.mkdirSync(path.resolve(this.options.dest));
            }

            fs.writeFileSync(
                path.join(path.resolve(this.options.dest), this.options.filename),
                JSON.stringify(manifest, null, '  ')
            );
        });
    }
}

module.exports = WebpackManifest;