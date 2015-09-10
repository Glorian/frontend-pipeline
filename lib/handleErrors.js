var Builder = require('../');

/**
 * Error Handler
 *
 * @param error
 * @param taskName
 */
var Helper = function(error, taskName) {
    new Builder.Notification().error(error, (taskName || error.plugin) + ' Compilation Failed');

    if (typeof this.emit != 'undefined') {
        this.emit('end');
    }
};

module.exports = Helper;