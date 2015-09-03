var notify = require('gulp-notify');

/**
 * New Notification instance
 *
 * @constructor
 */
var Notification = function() {
	this.title = 'SLT Builder';

	if (arguments.length) {
		return this.message(arguments[0]);
	}
};

var n = Notification.prototype;

/**
 * Show regular message
 *
 * @param message
 * @returns {*}
 */
n.message = function(message) {
	return notify({
		title: this.title,
		message: message,
		onLast: true
	});
};

/**
 * Show error message
 *
 * @param e
 * @param message
 */
n.error = function(e, message) {
	notify.onError({
		title: this.title,
		message: message + ': <%= error.message %>',
		icon: __dirname + '/icons/fail.png',
		onLast: true
	})(e);

	console.log(e);
};

/**
 * Show success message when tests passed
 *
 * @param framework
 * @returns {*}
 */
n.forPassedTests = function(framework) {
    return notify({
        title: 'Green!',
        message: 'Your ' + framework + ' tests passed!',
        icon: __dirname + '/icons/pass.png',
        onLast: true
    });
};

/**
 * Show fail message when test fails
 *
 * @param e
 * @param framework
 * @returns {*}
 */
n.forFailedTests = function(e, framework) {
    return notify.onError({
        title: 'Red!',
        message: 'Your ' + framework + ' tests failed!',
        icon: __dirname + '/icons/fail.png',
        onLast: true
    })(e);
};


module.exports = Notification;

