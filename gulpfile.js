var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

/**
 * Runs all build tasks in parallel.
 */
gulp.task('build', ['scripts']);

/**
 * Transpiles JS to ES6, ensuring the clean task finishes first.
 *
 * Note: adding clean to other tasks ensures it will be run once before
 * any of them start, but it will only be run once.
 */
gulp.task('scripts', ['clean'], function() {
    return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist')); 
});

/**
 * Deletes all files from the dist directory.
 */
gulp.task('clean', function () {
    del(['dist/**/*']);
});

gulp.task('test', ['build'], function() {
    return gulp.src(['tests/**/*.js'], { read: false })
        .pipe(mocha({reporter: 'min'}))
        .on('error', gutil.log);
});

gulp.task('lint', function(){
    return gulp.src(['src/**/*.js'])
        .pipe(jshint());
});

