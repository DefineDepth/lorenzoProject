const path = require('./path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const include = require('gulp-include');
const fileInclude = require('gulp-file-include');
 
function jsMain() {
  return gulp.src( path.src.js + 'main.js' )
    .pipe(fileInclude({
      prefix: '//=',
    }))
    .pipe(gulp.dest(path.dist.js))
}

module.exports = {
  jsMain,
};