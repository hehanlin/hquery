var browserify = require('browserify');  
var gulp = require('gulp');  
var uglify = require('gulp-uglify');  
var source = require('vinyl-source-stream');  
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');

gulp.task('browserify', function() {  
  return browserify('./src/main.js')
    .bundle()
    .pipe(source('bundle.js')) // gives streaming vinyl file object
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    .pipe(uglify()) // now gulp-uglify works 
    .pipe(rename('hquery.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch',function() {
	gulp.watch('./src/*.js',['browserify']);
});

gulp.task('default',['browserify','watch']);