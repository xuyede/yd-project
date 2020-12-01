const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

let entry = "./src/server/**/*.js";

function buildDev() {
  return watch(entry, { ignoreInitial: false }, function() {
    gulp.src(entry)
      .pipe(plumber())
      .pipe(babel({
        babelrc: false,
        "plugins": ["@babel/plugin-transform-modules-commonjs"]
      }))
      .pipe(gulp.dest('dist'))
  })
}

function buildProd() {

}

function buildClean() {

}

let build = gulp.series(buildDev);
if(process.env.NODE_ENV === 'production') {
  build = gulp.series(buildProd, buildClean);
}

gulp.task('default', build);

// exports.build = build;