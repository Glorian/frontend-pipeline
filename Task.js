"use strict";

let _ = require('lodash');
let Builder;

/**
 * Task class {create new instance}
 */
class Task {

    /**
     *
     * @param {string} name
     * @param {function} description
     */
    constructor(name, description) {
        this.name = name;
        this.watchers = [];
        this.ordering = 999;
        this.parallels = false;
        this.parallelGroup = false;
        this.prod = false;

        if (description) {
            this.describe(description);
        }
    }

    /**
     * Find task by name
     *
     * @param  {string} name
     * @return {Object}
     */
    static find(name) {
        let tasks = _.where(Builder.tasks, {name});

        return tasks[Builder.config.get(`activeTasks.${name}`)];
    }

    /**
     * Describe the task
     *
     * @param  {function} definition
     * @return {Task}
     */
    describe(definition) {
        this.definition = definition;

        this.register();

        return this;
    }

    /**
     * Pushing task to main queue
     *
     * @return {Task}
     */
    register() {
        Builder.tasks.push(this);

        Builder.config.set('activeTasks', Builder.config.get('activeTasks') || {});
        Builder.config.set(`activeTasks.${this.name}`, 0);

        return this;
    }

    /**
     * Set a path regex to watch changes
     *
     * @param  {object} regex
     * @param  {string} category
     * @return {Task}
     */
    watch(regex, category) {
        if (regex) {
            this.watchers.push(regex);
        }

        this.category = category || 'default';

        return this;
    }

    /**
     * Set execution order of the task
     *
     * @param {int} order
     * @returns {Task}
     */
    order(order) {
        this.ordering = _.parseInt(order);

        return this;
    }

    /**
     * Set parallel behavior
     *
     * @param  {boolean} parallel
     * @return {Task}
     */
    parallel(parallel) {
        this.parallels = !!parallel;

        return this;
    }

    /**
     * Set marker that points us to start new sequence group
     *
     * @param  {boolean} newGroup
     * @return {Task}
     */
    group(newGroup) {
        this.parallelGroup = !!newGroup;

        return this;
    }

    /**
     * Execute task only in dev mode
     *
     * @param  {boolean} prodOnly
     * @return {Task}
     */
    production(prodOnly) {
        this.prod = !!prodOnly;

        return this;
    }

    /**
     * Exclude path from watcher
     *
     * @param  {string} path
     * @return {Task}
     */
    ignore(path) {
        this.watchers.push(('!./' + path).replace('././', './'));

        return this;
    }

    /**
     * Fire task
     *
     * @param  {Function} done
     * @return {Function}
     */
    run(done) {
        return this.definition(done);
    }

    /**
     * Log task input && output
     *
     * @param  {string} src
     * @param  {string} output
     */
    log(src, output) {
        Builder.Log
            .heading(`Fetching ${_.capitalize(this.name)} Source Files...`)
            .files(src.path ? src.path : src, true);

        if (output) {
            Builder.Log
                .heading('Saving To...')
                .files(output.path ? output.path : output);
        }
    }
}

module.exports = builder => {
    Builder = builder;

    return Task;
};