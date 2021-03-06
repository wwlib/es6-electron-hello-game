var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
//var browserify = require('gulp-browserify');
var fs = require('fs-extra');

var sourcemaps = require("gulp-sourcemaps");

gulp.task('es6', function() {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel()).on('error', function (error) {
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});



// Empty the build directory to ensure no old build files are left there
// and to ensure we start on a clean slate
gulp.task("clean", function(cb) {
    fs.emptyDir('./dist', cb);
});

// The watch tasks first cleans the dist directory before starting to watch for changes
gulp.task("watch", ["clean"], function() {
    watch("src/**/*.js", {ignoreInitial: false}, function() {
        gulp.start("es6");
    });
});

gulp.task('default', ['watch']);