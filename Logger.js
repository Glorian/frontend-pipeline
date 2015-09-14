"use strict";

let _ = require('lodash');
let fs = require('fs');
let gutil = require('gulp-util');

/**
 *  Logger class
 */
class Logger {

    /**
     * Log header
     *
     * @param heading
     * @returns {Logger}
     */
    heading(heading) {
        console.log('');

        console.log(
            gutil.colors.black(gutil.colors.bgGreen(heading))
        );

        return this;
    }

    /**
     * Print simple message
     *
     * @param {string} message
     * @returns {Logger}
     */
    message(message) {
        console.log(message);

        return this;
    }

    /**
     * Log a bunch of files
     *
     * @param files
     * @param checkForFiles
     * @returns {Logger}
     */
    files(files, checkForFiles) {
        files = _.isArray(files)
            ? files
            : [files];

        let spacer = '  - ';

        files.forEach(file => {
            if (!checkForFiles || Logger.assertFileExists(file)) {
                console.log(spacer + file);
            } else {
                console.log(`${spacer} ${gutil.colors.bgRed(file)} <-- Not Found`);
            }
        });

        console.log();

        return this;
    }

    /**
     * Check if file exists
     */
    static assertFileExists(file) {
        return file.match(/\*/) || fs.existsSync(file);
    }
}

module.exports = Logger;