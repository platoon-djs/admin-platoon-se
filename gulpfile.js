var gulp = require('gulp'),
	connect = require('gulp-connect-php');


gulp.task('default', ['connect']);

gulp.task('connect', function() {
	return connect.server({
		port: 8080,
		base: 'public'
	});
});