'use strict';


var gulp    = require('gulp');
var sass    = require('gulp-sass');
var csscomb = require('gulp-csscomb');

var cache   = require('gulp-cached');

var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');


gulp.task('sass', function() {
  return gulp.src('./sass/**/*.{sass,scss}')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(cache('sass'))
    .pipe(sass())
    .pipe(csscomb({configPath: './.csscomb.json'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', ['sass'], function() {
  gulp.watch('./sass/**/*.{sass,scss}', ['sass']);
});

gulp.task('default', ['sass:watch']);
