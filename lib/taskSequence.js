"use strict";

let _ = require('lodash');
let Builder = require('../');

/**
 * Prepare tasks sequence
 *
 * @param tasks
 * @returns {*}
 * @constructor
 */
let Helper = tasks => {
    tasks = _.sortBy(tasks, 'ordering');

    return (
        _.chain(tasks)
        .where(
            !Builder.config.get('production')
                ? { prod: false }
                : ''
        )
        .transform(function(result, val, key) {
            let prevTask = tasks[key - 1],
                taskName = val.name;

            if (!val.parallels) {
                return result[key] = taskName;
            }

            if (prevTask && prevTask.parallels && !val.parallelGroup) {
                return _.last(result).push(taskName);
            }

            return result[key] = [taskName];
        })
        .compact()
        .value()
    );
};

module.exports = Helper;