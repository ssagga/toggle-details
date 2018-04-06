var gulp        = require('gulp');
const babel     = require('gulp-babel');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();



// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"  
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


// Transpile Javascript using Babel
gulp.task('babel' , function() {
    gulp.src('src/toggle-details.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('dist'))
});



gulp.task('default', ['babel','serve']);