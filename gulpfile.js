'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create(),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer'),
    cache       = require('gulp-cache'),
    clean       = require('gulp-clean');


//Scripts
gulp.task('js', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

//Styles
gulp.src('src/sass/bundle.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cleanCss())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}))
gulp.task('sass', function () {
});


//Html include
gulp.task('html', function() {
    return gulp.src(['src/pages/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest('build'))
});


//Fonts
gulp.task('fonts', function () {
    gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
});



//Images compression
gulp.task('img', function() {
    return gulp.src('src/assets/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/img'));
});


//Clean build
gulp.task('clean', function () {
    return gulp.src('build/', {read: false})
        .pipe(clean());  //TODO doesn't remove css folder
});

//Clear cache
gulp.task('clear', function () {
    return cache.clearAll();
});

//BrowserSync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: { // Определяем параметры сервера
            baseDir: 'build/' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});


// Watch
gulp.task('watch', ['html', 'sass', 'js', 'img', 'fonts'], function() {
    gulp.watch('src/components/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('src/components/**/*.html', ['html']).on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js', ['js']).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'browser-sync']);