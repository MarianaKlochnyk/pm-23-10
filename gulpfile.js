'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const imagemin=require('gulp-imagemin')

function buildStyles() {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
};

exports.buildStyles = buildStyles;

exports.watch = function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
};

gulp.task('minify', () => {
  return gulp.src('app/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('fileinclude', function() {
  return gulp.src('app/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'));
});

exports.html = gulp.series('fileinclude', 'minify')

 function images(){
  return gulp.src('app/img/**/*.png').pipe(imagemin()).pipe(gulp.dest('dist/img'))
 }

 exports.images = images

 gulp.task("copy-bootstrap", function () {
  return gulp
    .src([
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      //"node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    ])
    .pipe(gulp.dest("dist/css")); // Зберігаємо CSS
});

gulp.task(
  "default",
  gulp.series(exports.html, buildStyles, images, "copy-bootstrap", exports.watch)
);

/*gulp.task("bootstrap", function () {
  return gulp
    .src(
      [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
       // "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
      ],
      { base: "node_modules/bootstrap/dist" }
    ) // базовий шлях для коректного збереження в dist
    .pipe(gulp.dest("dist/css")); // Копіювання у dist
});*/