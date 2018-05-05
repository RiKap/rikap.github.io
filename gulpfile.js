let gulp = require('gulp');
let watch = require('gulp-watch');
let concat = require('gulp-concat');
let less = require('gulp-less');
let minifyCss = require('gulp-clean-css');
let minifyHtml = require('gulp-htmlmin');
let minifyJs = require('gulp-uglify');

gulp.task('css', function() {
	return gulp.src('./static/css/main.less')
		.pipe(less())
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('./static/webtemp'));
});

gulp.task('js', function () {
	return gulp.src('./static/js/**/*.js')
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
	gulp.watch(['./static/css/**/*.less'], ['css']);
	gulp.watch(['./static/js/**/*.js'], ['js']);
});
