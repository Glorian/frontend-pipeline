var p       = require('path');
var _       = require('lodash');

/**
 * Main Config class
 *
 * @returns {Config}
 * @constructor
 */
var Config = function () {
    this.config = require('./configs/defaults');
    this.folder = './configs/partials/';

    this._requireConfigs();

    return this;
};

/**
 * Read config partials directory && require every
 * config partial to populate main object
 *
 * @private
 */
Config.prototype._requireConfigs = function () {
    var parent = module.parent,
        parentFile = parent.filename,
        parentDir = p.dirname(parentFile);

    require('fs')
        .readdirSync(p.resolve(parentDir, this.folder))
        .forEach(this._requireConfigFile.bind(this));
};

/**
 * Requiring partial and merging with global config
 *
 * @param file
 * @private
 */
Config.prototype._requireConfigFile = function (file) {
    this.config = _.merge(this.config, require(this.folder + file)(this));
};

/**
 * Get config property by path
 *
 * @param path
 * @returns {*}
 */
Config.prototype.get = function (path) {
    return path == '*'
        ? this.config
        : _.get(this.config, path);
};

/**
 * Set config value by path
 *
 * @param {string} path
 * @param {string|object} value
 */
Config.prototype.set = function (path, value) {
    this._requireConfigs();

    this.config = _.set(this.config, path, value);
};

/**
 * Get full assets path based on chosen path
 *
 * @param path
 * @returns {string|*}
 */
Config.prototype.getPath = function (path) {
    var basePath,
        current = this.config,
        segments = path.split('.');

    if (segments[0] == 'root') {
        basePath = this.config[segments.shift() + 'Path'];
    }

    if (segments[0] == 'assets' || segments[0] == 'public') {
        var innerPath = this.config[segments.shift() + 'Path'];

        basePath = !!basePath
            ? p.join(basePath, innerPath)
            : innerPath;
    }

    segments.forEach(function (segment) {
        current = current[segment];
    });

    current = segments.length
        ? current
        : '';

    return p.join(basePath, current);
};

module.exports = new Config;