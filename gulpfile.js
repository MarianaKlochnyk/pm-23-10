'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Таск для компиляции SCSS
function buildStyles() {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
}

// Таск для минификации HTML
function minifyHTML() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
}

// Таск для инклюда HTML-файлов
function fileInclude() {
  return gulp.src('app/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'));
}

// Задача для обработки изображений
function images() {
  return gulp.src('app/img/**/*.{jpg,jpeg,png,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
}

// Таск для JavaScript
function scripts() {
  return gulp.src('./app/js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
}

// Копирование Bootstrap CSS
function copyBootstrap() {
  return gulp.src("node_modules/bootstrap/dist/css/bootstrap.min.css")
    .pipe(gulp.dest("dist/css"));
}

// Наблюдение за изменениями
function watchFiles() {
  gulp.watch('./app/scss/**/*.scss', buildStyles);
  gulp.watch('app/**/*.html', gulp.series(fileInclude, minifyHTML));
  gulp.watch('app/img/**/*.{jpg,jpeg,png,gif}', images);
  gulp.watch('./app/js/**/*.js', scripts);
}

// Основные задачи
const html = gulp.series(fileInclude, minifyHTML);
const build = gulp.series(html, buildStyles, images, scripts, copyBootstrap);
const watch = gulp.parallel(watchFiles, build);

// Экспорт задач
exports.buildStyles = buildStyles;
exports.images = images;
exports.scripts = scripts;
exports.html = html;
exports.watch = watchFiles;
exports.default = watch;
