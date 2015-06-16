var gulp = require('gulp');
var Builder = require('systemjs-builder');
var typescript = require('gulp-typescript');
var del = require('del');
var plumber = require('gulp-plumber');

var DIR_CONFIG = {
  dest: {
    js: {
      all: 'dist/js',
      dev: {
        es6: 'dist/js/dev/es6'
      },
      prod: {
        es6: 'dist/js/prod/es6'
      }
    }
  }
};

gulp.task('build.js.dev', ['clean:js'], function() {
  var tsProject = typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
  var tsResult = tsProject.src()
    .pipe(plumber())
    .pipe(typescript(tsProject));
  return tsResult.js.pipe(gulp.dest(DIR_CONFIG.dest.js.dev.es6));
});

gulp.task('clean:js', function(done) {
  del([DIR_CONFIG.dest.js.all], done);
});

gulp.task('build', ['build.js.dev']);
gulp.task('default', ['build']);
