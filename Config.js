"use strict";

let p = require('path');
let _ = require('lodash');

/**
 * Main Config class
 */
class Config {
    constructor() {
        this.config = require('./configs/defaults');
        this.folder = './configs/partials';

        this._requireConfigs();
    }

    /**
     * Read config partials directory && require every
     * config partial to populate main object
     *
     * @private
     */
    _requireConfigs() {
        let parent = module.parent,
            parentFile = parent.filename,
            parentDir = p.dirname(parentFile);

        require('fs')
            .readdirSync(p.resolve(parentDir, this.folder))
            .forEach(this._requireConfigFile.bind(this));
    }

    /**
     * Requiring partial and merging with global config
     *
     * @param file
     * @private
     */
    _requireConfigFile(file) {
        this.config = _.merge(this.config, require(p.resolve(this.folder, file))(this));
    }

    /**
     * Get config property by path
     *
     * @param path
     * @returns {config|exports|module.exports|*}
     */
    get(path) {
        return path == '*' ? this.config : _.get(this.config, path);
    }

    /**
     * Set config value by path
     *
     * @param path
     * @param value
     */
    set(path, value) {
        this._requireConfigs();

        this.config = _.set(this.config, path, value);
    }

    /**
     * Get full assets path based on chosen path
     *
     * @param path
     */
    getPath(path) {
        let basePath,
            current = this.config,
            segments = path.split('.');

        if (segments[0] == 'assets' || segments[0] == 'public') {
            basePath = this.config[segments.shift() + 'Path'];
        }

        segments.forEach(segment => current = current[segment]);

        return p.join(basePath, current);
    }
}

module.exports = Config;