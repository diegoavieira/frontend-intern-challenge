var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
});

gulp.task('useref', function() {
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'));
});

gulp.task('imagemin', function() {
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
		.pipe(imagemin())
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('clean', function() {
	return del.sync('dist').then(function(cb) {
		return cache.clearAll(cb);
	});
});

gulp.task('clean:dist', function() {
	return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

gulp.task('default', function(callback) {
	runSequence(['sass'], 'watch',
		callback
	);
});

gulp.task('build', function(callback) {
	runSequence(
		'clean:dist',
		'sass',
		['useref', 'imagemin'],
		callback
	);
});
