const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const clean = require('gulp-clean')
const rename = require('gulp-rename')
const cleanCss = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const imgmin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()

const path = {
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    },
    scss: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    js: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    img: {
        src: 'src/img/**/*',
        dest: 'dist/img/'
    },
    fonts: {
        src: 'src/fonts/**',
        dest: 'dist/fonts/'
    }
}

const cleanDist = () => {
    return gulp.src('dist', { allowEmpty: true })
        .pipe(clean())
}

const html = () => {
    return gulp.src(path.html.src)
        .pipe(gulp.dest(path.html.dest))
        .pipe(browserSync.stream())
}

const styles = () => {
    return gulp.src(path.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCss({ level: 2 }))
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.scss.dest))
        .pipe(browserSync.stream())
}

const scripts = () => {
    return gulp.src(path.js.src)
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.js.dest))
        .pipe(browserSync.stream())
}

const img = () => {
    return gulp.src(path.img.src)
        .pipe(imgmin({ progressive: true }))
        .pipe(gulp.dest(path.img.dest))
}

const fonts = () => {
    return gulp.src(path.fonts.src)
        .pipe(gulp.dest(path.fonts.dest))
}

const watch = () => {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    })

    gulp.watch(path.html.dest).on('change', browserSync.reload)
    gulp.watch(path.html.src, html)
    gulp.watch(path.scss.src, styles)
    gulp.watch(path.js.src, scripts)
}

const build = gulp.series(cleanDist, img, fonts, gulp.parallel(html, styles, scripts), watch)

exports.cleanDist = cleanDist
exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.img = img
exports.watch = watch
exports.build = build
exports.default = build