require('babel/register');

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    del = require('del'),
    mocha = require('gulp-mocha'),
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util');

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

gulp.task('test', function() {
    return gulp.src(['tests/**/*.js'], { read: false })
        .pipe(mocha({reporter: 'min'}))
        .on('error', gutil.log);
});

// TODO: Try gulp-mocha-tdd so we can make use of node-inspector
gulp.task('test:debug', function() {
    return gulp.src(['tests/**/*.js'], { read: false })
        .pipe(mocha({reporter: 'min'}))
        .on('error', gutil.log);
});

gulp.task('lint', function(){
    return gulp.src(['src/**/*.js'])
        .pipe(jshint());
});

gulp.task('watch', function() {
   gulp.watch(['src/**/*.js'], ['build']);
});
