var path    = require('path');
var fs      = require('fs');

module.exports = function(publicPath, dest, filename) {
  filename = filename || 'rev-manifest.json';

  return function() {
    this.plugin("done", function(stats) {
      var chunks = stats.toJson().assetsByChunkName;
      var manifest = {};

      for (var key in chunks) {
        manifest[path.join(publicPath, key + '.js')] = publicPath + chunks[key];
      }

      if (! fs.existsSync(path.resolve(dest))) {
        fs.mkdirSync(path.resolve(dest));
      }

      fs.writeFileSync(
        path.join(path.resolve(dest), filename),
        JSON.stringify(manifest)
      );
    });
  };
};
