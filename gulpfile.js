"use strict";

var gulp = require('gulp');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var cp = require('child_process');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var args = require('yargs').argv;
var gulpif = require('gulp-if');
var minifyInline = require('gulp-minify-inline-scripts');
var sourcemaps = require('gulp-sourcemaps');

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
  cssChanged: '<span style="color: grey">CSS UPDATED:</span>',
  jsChanged: '<span style="color: grey">JavaScript UPDATED:</span>'
};

var css_files = [
  "src/lib/normalize.css/normalize.css",
  "src/lib/font-awesome/css/font-awesome.css",
  "src/css/*.css",
  "!src/css/styles.css"
];
var js_files = [
  "src/lib/jquery/dist/jquery.js",
  "src/js/*.js",
  "!src/js/scripts.js"
];
var font_files = [
  "src/lib/font-awesome/fonts/**"
];

gulp.task('css', ['sass'], function () {
  browserSync.notify(messages.cssChanged);
  return gulp.src(css_files)
    .pipe(sourcemaps.init())
    .pipe(gulpif(args.min, minifyCss()))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('src/css'));
});

gulp.task('js', function () {
  browserSync.notify(messages.jsChanged);
  return gulp.src(js_files)
    .pipe(sourcemaps.init())
    .pipe(gulpif(args.min, uglify({outSourceMap: true})))
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_site/js'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('src/js'));
});

gulp.task('sass', function () {
  return gulp.src('src/css/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css/'));
});

gulp.task('html', function () {
  var opts = {
    comments: false,
    spare: true
  };
  gulp.src('_site/**/*.html')
    .pipe(gulpif(args.min, minifyHtml(opts)))
    .pipe(gulpif(args.min, minifyInline()))
    .pipe(gulp.dest('_site/'));
});

gulp.task('fonts', function () {
  return gulp.src(font_files)
    .pipe(gulp.dest('src/fonts'));
});

gulp.task('jekyll-build', ['fonts', 'css', 'js'], function (done) {
  browserSync.notify(messages.jekyllBuild);
    return cp.spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' }).on('close', done);
});

gulp.task('jekyll-simple-build', [], function (done) {
  browserSync.notify(messages.jekyllBuild);
    return cp.spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' }).on('close', done);
});

gulp.task('jekyll-just-reload', ['jekyll-simple-build'], function () {
  browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'jekyll-build'], function () {
  browserSync.init({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('src/css/*.scss', ['css']);
  gulp.watch('src/js/script.js', ['js']);
  gulp.watch('src/index.html', ['jekyll-just-reload']);
  gulp.watch('src/_pages/*', ['jekyll-just-reload']);
  gulp.watch('src/_includes/*', ['jekyll-just-reload']);
  gulp.watch('src/_posts/*', ['jekyll-just-reload']);
});

gulp.task('default', ['browser-sync', 'watch']);

/**
 * Use with `gulp release --min` - will enable all minifications
 */
gulp.task('release',['jekyll-build'], function() {
  gulp.start('html');
  // Start browser sync just for preview
  browserSync.init({
    server: {
      baseDir: '_site'
    }
  });
});
