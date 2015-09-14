"use strict";

let notify = require('gulp-notify');

/**
 * New Notification instance
 */
class Notification {
    constructor() {
        this.title = 'Frontend Pipeline';

        if (arguments.length) {
            return this.message(arguments[0]);
        }
    }

    /**
     * Show regular message
     *
     * @param message
     * @returns {*}
     */
    message(message) {
        return notify({
            title: this.title,
            message: message,
            onLast: true
        });
    }

    /**
     * Show error message
     *
     * @param e
     * @param message
     */
    error(e, message) {
        notify.onError({
            title: this.title,
            message: `${message}: <%= error.message %>`,
            icon: `${__dirname}/icons/fail.png`,
            onLast: true
        })(e);

        console.log(e);
    }

    /**
     * Show success message when tests passed
     *
     * @param framework
     * @returns {*}
     */
    forPassedTests(framework) {
        return notify({
            title: 'Green!',
            message: `Your ${framework} tests passed!`,
            icon: `${__dirname}/icons/pass.png`,
            onLast: true
        });
    }

    /**
     * Show fail message when test fails
     *
     * @param e
     * @param framework
     * @returns {*}
     */
    forFailedTests(e, framework) {
        return notify.onError({
            title: 'Red!',
            message: `Your ${framework} tests failed!`,
            icon: `${__dirname}/icons/fail.png`,
            onLast: true
        })(e);
    }
}

module.exports = Notification;