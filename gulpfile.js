var gulp        = require('gulp');
var rename      = require('gulp-rename');
const babel     = require('gulp-babel');
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');
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


// Transpile Javascript using Babel and generate compressed version using uglify
gulp.task('transpile' , function() {
    gulp.src('src/toggle-details.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('toggle-details.min.js'))
    .pipe(gulp.dest('dist'))
});



gulp.task('default', ['transpile','serve']);