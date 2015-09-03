var fs      = require('fs');
var gutil   = require('gulp-util');

/**
 *  Logger class
 */
var Logger = function() {};

/**
 *  Log a header
 */
Logger.heading = function(heading) {
	console.log('');

	console.log(
		gutil.colors.black(gutil.colors.bgGreen(heading))
	);

	return Logger;
};

/**
 *  Print simple message
 */
Logger.message = function(message) {
	console.log(message);

	return Logger;
};

/**
 *  Log a bunch of files
 */
Logger.files = function(files, checkForFiles) {
	files = Array.isArray(files) ? files : [files];
	var spacer = '  - ';

	files.forEach(function(file) {
		if ( ! checkForFiles || assertFileExists(file)) {
			console.log(spacer + file);
		} else {
			console.log(spacer + gutil.colors.bgRed(file) + ' <-- Not Found');
		}
	});

	console.log();

	return Logger;
};

var assertFileExists = function(file) {
	return file.match(/\*/) || fs.existsSync(file);
};

module.exports = Logger;