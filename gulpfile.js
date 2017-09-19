/**
 * Created by AndersenUser on 18.09.2017.
 */
'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create();


gulp.task('minify', function () {
    gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

//Style compilation
gulp.task('style', function () {
    gulp.src('src/components/**/*.scss')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream: true}))
});

//Html include
gulp.task('html', function() {
    return gulp.src(['./src/pages/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest('build'))
});


//BrowserSync
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync.init({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: './build' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
    // browserSync.watch('src/**/*.*', 'src/**/**/*.*').on("change", browserSync.reload);
});

// Watch
gulp.task('watch', ['style', 'browser-sync'], function() {
    gulp.watch('src/components/**/*.scss', ['style']).on('change', browserSync.reload); // Наблюдение за sass файлами
    gulp.watch('src/components/**/*.html', ['html']).on('change', browserSync.reload);
        // gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    // gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('watch:style', ['style'], reload);

// Перезагрузка браузера
function reload (done) {
  browserSync.reload();
  done();
}

gulp.task('all', ['html', 'style']);