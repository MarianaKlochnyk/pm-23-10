import gulp from "gulp";
import cssnano from "gulp-cssnano";
import autoprefixer from "gulp-autoprefixer";
import imagemin from "gulp-imagemin";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import browserSync from "browser-sync";
import * as sass from "sass";
import gulpSass from "gulp-sass";
import fileInclude from "gulp-file-include";

const sassCompiler = gulpSass(sass);

// Таск для HTML
gulp.task("html", function () {
  return gulp
    .src("app/*.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("dist")) // Зберігаємо в dist/html
    .pipe(browserSync.stream());
});

// Таск для SASS
gulp.task("scss", function () {
  return gulp
    .src('app/scss/**/*.scss')
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/css")) // Зберігаємо в dist/css
    .pipe(browserSync.stream());
});

// Таск для JS
gulp.task("scripts", function () {
  return gulp
    .src("app/js/*.js")
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/js")) 
    .pipe(browserSync.stream());
});

// Таск для зображень
gulp.task("imgs", function () {
  return gulp
    .src("app/img/*.+(jpg|jpeg|png|gif)", { encoding: false })
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
      })
    )
    .pipe(gulp.dest("dist/img"));
});

// Таск для спостереження за файлами
gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  gulp
    .watch("app/*.html", gulp.series("html"))
    .on("change", browserSync.reload);
  gulp.watch("app/js/*.js", gulp.series("scripts"));
  gulp.watch("app/json/*.json", gulp.series("copy-json"));
  gulp.watch("app/scss/**/*.scss", gulp.series("scss"));
  gulp.watch("app/img/*.+(jpg|jpeg|png|gif)", gulp.series("imgs"));
});

// Таск для копіювання Bootstrap
gulp.task("copy-bootstrap", function () {
  return gulp
    .src([
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      // "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    ])
    .pipe(gulp.dest("dist/css")); // Зберігаємо CSS в dist/css
});

// Таск для копіювання data.json
gulp.task("copy-json", function () {
  return gulp.src("app/json/data.json")
  .pipe(rename({ suffix: ".min" }))
  .pipe(gulp.dest("./dist/json"))
  .pipe(browserSync.stream());
});

// Задача за замовчуванням
gulp.task(
  "default",
  gulp.series("html", "scss", "scripts", "imgs", "copy-bootstrap", "copy-json", "watch")
);
