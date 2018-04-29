var gulp = require('gulp');
var watch = require('gulp-watch');
var order = require('gulp-order');
var concat = require('gulp-concat');
var minifyCss = require('gulp-clean-css');
var minifyHtml = require('gulp-htmlmin');
var minifyJs = require('gulp-uglify');

gulp.task('css', function() {
	return gulp.src('./static/css/**/*.css')
		.pipe(order([
			'static/css/**/*.css',
			'static/css/main.css',
		]))
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('./static/webtemp'));
});

gulp.task('js', function () {
	return gulp.src('./static/js/**/*.js')
		.pipe(order([
			'static/js/**/*.js',
			'static/js/main.js',
		]))
		.pipe(minifyJs())
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./static/webtemp'));
});

gulp.task('html', function() {
	return gulp.src('./public/*.html')
		.pipe(minifyHtml({collapseWhitespace: true}))
		.pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
	gulp.watch(['./static/css/**/*.css'], ['css']);
	gulp.watch(['./static/js/**/*.js'], ['js']);
});
