const path = require('./path');
const gulp = require('gulp');
const webpack = require('webpack-stream');
const rename = require('gulp-rename');

function jsMain() {
  return gulp.src(path.src.js + 'main.js')
    .pipe(
      webpack({
        // Any configuration options...
      })
    )
    .pipe(rename('main.js'))
    .pipe(gulp.dest(path.dist.js))
}

module.exports = {
  jsMain,
};