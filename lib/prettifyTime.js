/**
 * Helper: Changing time to human friendly format
 *
 * @param milliseconds
 * @returns {string}
 */
var Helper = function(milliseconds) {
    if (milliseconds > 999) {
        return (milliseconds / 100).toFixed(2) + ' s';
    } else {
        return milliseconds + ' ms';
    }
};

module.exports = Helper;