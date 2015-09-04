/**
 * Repeat string
 *
 * @param pattern
 * @param number
 * @returns {string}
 * @constructor
 */
var Helper = function (pattern, number) {
    var string = '';
    while (number > 0) {
        number--;
        string += pattern;
    }

    return string;
};

module.exports = Helper;