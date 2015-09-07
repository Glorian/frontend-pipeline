var _ = require('lodash');
var Builder = require('../');

/**
 * Prepare tasks sequence
 *
 * @param tasks
 * @returns {*}
 * @constructor
 */
var Helper = function (tasks) {
    tasks = _.sortBy(tasks, 'ordering');

    return (
        _.chain(tasks)
            .where(
            !Builder.config.get('production')
                ? {development: false}
                : ''
            )
            .transform(function (result, val, key) {
                var prevTask = tasks[key - 1],
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