/**
 * Helper: Capitalize first letter of string
 *
 * @param string
 * @returns {string}
 */
var Helper = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = Helper;