"use strict";

let _ = require('lodash');
let Builder = require('../');

/**
 * Error Handler
 *
 * @param error
 * @param taskName
 */
let Helper = (error, taskName) => {
    new Builder.Notification().error(error, `${(taskName || error.plugin)} Compilation Failed`);

    if (!_.isUndefined(this.emit)) {
        this.emit('end');
    }
};

module.exports = Helper;