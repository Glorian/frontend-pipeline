var _ = require('lodash');
var Builder;

/**
 * Task class {create new instance}
 *
 * @param name
 * @param description
 * @constructor
 */
var Task = function (name, description) {
    this.name = name;
    this.watchers = [];
    this.ordering = 999;
    this.parallels = false;
    this.parallelGroup = false;
    this.development = false;

    if (description) {
        this.describe(description);
    }
};

/**
 * Find task by name
 *
 * @param name
 * @returns {*}
 */
Task.find = function (name) {
    var tasks = _.where(Builder.tasks, {name: name});

    return tasks[Builder.config.get('activeTasks.' + name)];
};

/**
 * Describe the task
 *
 * @param definition
 * @returns {Task}
 */
Task.prototype.describe = function (definition) {
    this.definition = definition;

    this.register();

    return this;
};

/**
 * Pushing task to main queue
 *
 * @returns {Task}
 */
Task.prototype.register = function () {
    Builder.tasks.push(this);

    Builder.config.set('activeTasks', Builder.config.get('activeTasks') || {});
    Builder.config.set('activeTasks.' + this.name, 0);

    return this;
};

/**
 * Set a path regex to watch changes
 *
 * @param regex
 * @param category
 * @returns {Task}
 */
Task.prototype.watch = function (regex, category) {
    if (regex) {
        this.watchers.push(regex);
    }

    this.category = category || 'default';

    return this;
};

/**
 * Set execution order of the task
 *
 * @param {int} order
 * @returns {Task}
 */
Task.prototype.order = function (order) {
    this.ordering = _.parseInt(order);

    return this;
};

/**
 * Set parallel behavior
 *
 * @param {boolean} parallel
 * @returns {Task}
 */
Task.prototype.parallel = function (parallel) {
    this.parallels = !!parallel;

    return this;
};

/**
 * Set marker that points us to start new sequence group
 *
 * @param newGroup
 */
Task.prototype.group = function (newGroup) {
    this.parallelGroup = !!newGroup;

    return this;
};

/**
 * Set task
 *
 * @param devOnly
 * @returns {Task}
 */
Task.prototype.dev = function (devOnly) {
    this.development = !!devOnly;

    return this;
};

/**
 * Exclude path from watcher
 *
 * @param path
 * @returns {Task}
 */
Task.prototype.ignore = function (path) {
    this.watchers.push(('!./' + path).replace('././', './'));

    return this;
};

/**
 * Fire task
 *
 * @returns {*}
 */
Task.prototype.run = function (done) {
    return this.definition(done);
};

/**
 * Log task input && output
 *
 * @param src
 * @param output
 */
Task.prototype.log = function (src, output) {
    var task = this.name.substr(0, 1).toUpperCase() + this.name.substr(1);

    Builder.Log
        .heading('Fetching ' + task + ' Source Files...')
        .files(src.path ? src.path : src, true);

    if (output) {
        Builder.Log
            .heading('Saving To...')
            .files(output.path ? output.path : output);
    }
};

module.exports = function (builder) {
    Builder = builder;

    return Task;
};