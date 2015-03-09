'use strict';

// @formatter:off
var gulp        = require('gulp');
var del         = require('del');
var plugins     = require('gulp-load-plugins')();
var browserify  = require('browserify');
var babelify    = require("babelify");
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
// @formatter:on

// gulp-plumber for error handling
function onError() {
    var args = Array.prototype.slice.call(arguments);
    plugins.util.beep();
    plugins.notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end');
}

// Styles
gulp.task('styles', function () {
    return gulp.src('src/less/**/*')
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.less())
        .pipe(plugins.concat('main.css'))
        .pipe(gulp.dest('dist/styles'));
});

// Scripts
gulp.task('scripts', function () {
    var bundler;

    bundler = browserify({
        basedir: __dirname,
        noparse: ['react', 'react/addons', 'reflux', 'fastclick'],
        entries: ['./src/scripts/app.jsx'],
        transform: [babelify],
        extensions: ['.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    bundler = watchify(bundler);

    function rebundle() {
        console.log('Bundling Scripts...');
        var start = Date.now();
        return bundler.bundle()
            .on('error', onError)
            .pipe(source('app.js'))
            .pipe(gulp.dest('dist/scripts'))
            .pipe(plugins.notify(function () {
                console.log('Bundling Complete - ' + (Date.now() - start) + 'ms');
            }));
    }

    bundler.on('update', rebundle);

    return rebundle();
});

// HTML
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Images
gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'));
});

// Webserver
gulp.task('serve', function () {
    gulp.src('dist')
        .pipe(plugins.webserver({
            livereload: true,
            port: 9000,
            fallback: 'index.html'
        }));
});

// Clean
gulp.task('clean', function (cb) {
    del(['dist/styles', 'dist/scripts', 'dist/images'], cb);
});

// Default task
gulp.task('default', ['clean', 'html', 'styles', 'scripts']);

// Watch
gulp.task('watch', ['html', 'styles', 'scripts', 'serve'], function () {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/less/**/*.less', ['styles']);
    gulp.watch('src/images/**/*', ['images']);
});