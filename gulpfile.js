/**
 * Created by AndersenUser on 18.09.2017.
 */
'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    fileinclude = require('gulp-file-include');


gulp.task('minify', function () {
    gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

//Style compilation
gulp.task('style', function () {
    gulp.src('src/*.scss')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('build/css'))
});

gulp.task('html', function() {
    gulp.src(['index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest('build/html'))
});
