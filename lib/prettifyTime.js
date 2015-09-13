"use strict";

/**
 * Helper: Changing time to human friendly format
 *
 * @param milliseconds
 * @returns {string}
 */
let Helper = milliseconds => {
    if (milliseconds > 999) {
        return (milliseconds / 100).toFixed(2) + ' s';
    } else {
        return milliseconds + ' ms';
    }
};

module.exports = Helper;