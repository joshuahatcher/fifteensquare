const gulp = require('gulp'); 

const jshint = require('gulp-jshint');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

// Lint Task
gulp.task('lint', () => {
    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile LESS
gulp.task('less', () => {
    return gulp.src('css/main.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename('main.css'))
        .pipe(gulp.dest('dist'));
});

// Compile JS
gulp.task('js', () => {
    return gulp.src('js/main.js')
        .pipe(babel({presets: ['babili']}))
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', () => {
    gulp.watch('js/**/*.js', ['lint', 'js']);
    gulp.watch('*.less', ['less']);
});

// Default Task
gulp.task('build', [ 'lint', 'less', 'js' ]);
