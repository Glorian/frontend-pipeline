"use strict";

let p = require('path');
let _ = require('lodash');

let nconf = require('nconf');

nconf.file(JSON.stringify(require('./configs/main.js')));

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
            parentDir = p.dirname(parentFile),
            currentFolder = p.resolve(parentDir, this.folder);

        require('fs')
            .readdirSync(currentFolder)
            .forEach(file => this._requireConfigFile(
                p.join(currentFolder, file)
            ));
    }

    /**
     * Requiring partial and merging with global config
     *
     * @param file
     * @private
     */
    _requireConfigFile(file) {
        this.config = _.merge(
            this.config,
            require(file)(this)
        );
    }

    /**
     * Get config property by path
     *
     * @param path
     * @returns {*}
     */
    get(path) {
        return path == '*'
            ? this.config
            : _.get(this.config, path);
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
     * @returns {string}
     */
    getPath(path) {
        let basePath,
            current = this.config,
            segments = path.split('.');

        if (segments[0] == 'root') {
            basePath = this.config[`${segments.shift()}Path`];
        }

        if (segments[0] == 'assets' || segments[0] == 'public') {
            let innerPath = this.config[`${segments.shift()}Path`];

            basePath = !!basePath
                ? p.join(basePath, innerPath)
                : innerPath;
        }

        segments.forEach(segment => current = current[segment]);

        current = segments.length
            ? current
            : '';

        return p.join(basePath, current);
    }
}

module.exports = Config;