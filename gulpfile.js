var gulp          = require('gulp'),
	templateCache = require('gulp-angular-templatecache'),
	concat        = require('gulp-concat'),
	connect       = require('gulp-connect-php'),
	csso          = require('gulp-csso'),
	filter        = require('gulp-filter'),
	livereload    = require('gulp-livereload'),
	minifyHtml    = require('gulp-minify-html'),
	plumber       = require('gulp-plumber'),
	rename        = require('gulp-rename'),
	sass          = require('gulp-sass'),
	sourcemaps    = require('gulp-sourcemaps'),
	uglify        = require('gulp-uglify'),
	gutil         = require('gulp-util'),
	watch         = require('gulp-watch'),
	wrap          = require('gulp-wrap'),
	_             = require('lodash'),
	fs            = require('fs'),
	merge         = require('merge2'),
	ftp           = require('vinyl-ftp');


var wrapper = [
	'/**',
	' * Copy platoon DJs 2014 - %Y',
	' */',
	'(function(window, angular) {',
		'"use strict";',
		'<%=contents%>',
	'})(window, window.angular);'
].join('\n').replace('%Y', new Date().getFullYear());


gulp.task('connect', function() {
	return connect.server({
		port: 8080,
		base: 'public'
	});
});

gulp.task('app', function() {
	return gulp.src([
			'*/**',
			'*.js'
		], {cwd: 'web/app'})
		.pipe(plumber())
		.pipe(concat('platoon.js'))
		.pipe(wrap(wrapper))
		.pipe(sourcemaps.init())
		.pipe(gulp.dest('public/js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.', {
			includeContent: false,
			sourceRoot: '/js'
		}))
		.pipe(rename(function(path) {
			if (path.extname === '.js') {
				path.basename += '.min';
			}
		}))
		.pipe(gulp.dest('public/js'))
		.pipe(filter('*.js'))
		.pipe(livereload());
});

gulp.task('sass', function() {
	return gulp.src([
			'*.scss',
			'*.sass'
		], {cwd: 'web/sass'})
		.pipe(plumber())
		.pipe(sass())
		.pipe(sourcemaps.init())
		.pipe(gulp.dest('public/css'))
		.pipe(csso())
		.pipe(sourcemaps.write('.', {
			includeContent: false,
			sourceRoot: '/css'
		}))
		.pipe(rename(function(path) {
			if (path.extname === '.css') {
				path.basename += '.min';
			}
		}))
		.pipe(gulp.dest('public/css'))
		.pipe(filter('*.css'))
		.pipe(livereload());
});

gulp.task('template', function() {

	var src = [
			'!auth/**',
			'!index.html',
			'**/*.html'
		],
		wd = {cwd: 'web/views'}
		dest = 'public/js',
		settings = {
			root: 'tpl',
			standalone: true,
			filename: 'platoon-tpls.js',
			module: 'platoon.tpls'
		};

	gulp.src(src, wd)
		.pipe(plumber())
		.pipe(templateCache(settings))
		.pipe(wrap(wrapper))
		.pipe(gulp.dest(dest))
		.pipe(filter('*.js'))
		.pipe(livereload());

	gulp.src(src, wd)
		.pipe(plumber())
		.pipe(minifyHtml({
			empty: true,
			conditionals: true,
			spare: true,
			quotes: true
		}))
		.pipe(templateCache(settings))
		.pipe(rename(function(p) {p.basename += '.min'}))
		.pipe(wrap(wrapper))
		.pipe(uglify())
		.pipe(gulp.dest(dest))
		.pipe(filter('*.js'))
		.pipe(livereload());
});

gulp.task('watch', ['app', 'sass', 'template'], function() {
	watch('web/app/**', function() {
		gulp.start('app');
	});
	watch('web/sass/**', function() {
		gulp.start('sass');
	});
	watch('web/views/**', function() {
		gulp.start('template');
	});
});

gulp.task('reload', ['connect', 'watch'], function() {
	livereload.listen();
});

gulp.task('deploy', function() {
	var ftpSettings = JSON.parse(fs.readFileSync('.deploy', 'utf-8'));

	var conn = ftp.create({
		host:     ftpSettings.host,
		user:     ftpSettings.user,
		password: ftpSettings.password,
		log: gutil.log
	});
	
	return gulp.src([
			'app/**',
			'!public/bower/**',
			'public/**',
			'public/web/views/auth/**',
			'public/web/views/index.html',
			'public/.htaccess'
		], { base: '.', buffer: false })
		.pipe(conn.newerOrDifferentSize(ftpSettings.dest))
		.pipe(conn.dest(ftpSettings.dest))
});

gulp.task('default', ['reload']);
