/**
 * Gulpfile
 * @author Richard Santos <rsantos@tray.com.br>
 */
'use strict';

const gulp = require('gulp');
const c = require('ansi-colors');
const log = require('fancy-log');
const fs = require('fs');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const less = require('gulp-less');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const bSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const path = require('path');
const yaml = require('js-yaml');
const process = require('process');
const cp = require('child_process');
const spawn = require('child_process').spawn;

sass.compiler = require('node-sass');

/**
 * Get CLI args
 */
let FOLDER;
for (let i = process.argv.length; i > 0; i--) {
    const arg = process.argv[i];
    const nextArg = process.argv[i + 1];

    if (arg == '--folder' && nextArg) {
        FOLDER = process.cwd() + '/' + nextArg;
    }
}

if (!FOLDER) {
    const example = 'gulp --folder opencode.commercesuite.com.br';
    log(c.red('Error: missing param: --folder, ex: ' + example));
    process.exit(1);
}

/**
 * Get OpenCode config file
 */
const configYML = FOLDER + '/config.yml';
const configOpenCode = yaml.safeLoad(fs.readFileSync(configYML, 'utf8'));
const URL = configOpenCode[':preview_url'];

if (!URL) {
    log(c.red('Error: Did you configured opencode? Check your file: ' + configYML));
    process.exit(1);
}

const CSSPATH = FOLDER + '/css/';
const JSPATH = FOLDER + '/js/';
const IMGPATH = FOLDER + '/img/';
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => {
  return gulp.src(CSSPATH + 'sass/theme.min.scss', { allowEmpty: true })
    .pipe(sass({errLogToConsole: true}).on('error', log))
    // .pipe(concat('theme.min.css'))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(CSSPATH));
});

gulp.task('less', () => {
    return gulp.src(CSSPATH + 'less/theme.min.less', { allowEmpty: true })
    .pipe(less())
    .pipe(concat('theme.min.css'))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(CSSPATH));
});

gulp.task('stylus', () => {
    return gulp.src(CSSPATH + 'stylus/theme.min.styl', { allowEmpty: true })
        .pipe(stylus())
        .pipe(concat('theme.min.css'))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(CSSPATH));
});

gulp.task('js', () => {
    return gulp.src(JSPATH + "modules/*.js", { allowEmpty: true })
        .pipe(concat("theme.min.js"))
        .pipe(uglify({"compress": false}))
        .pipe(gulp.dest(JSPATH));
});

const imageFiles = [
    IMGPATH + '**/*.{png,jpg,gif,svg}',
    '!'+ IMGPATH + 'dist/*'
];

gulp.task('imagemin', () => {
    return gulp.src(imageFiles, { allowEmpty: true })
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(IMGPATH + 'dist/'));
});

gulp.task('bsync', () => {
    bSync.init({
        logPrefix: 'Tray Opencode',
        logFileChanges: false,
        open: 'external',
        proxy: {
            target: URL
        },
        reloadDelay: 800,
        port: 8081,
        https: true,
        files: FOLDER + '**/**',
    });
});

gulp.task('opencode', () => {
    process.chdir(FOLDER);

    const opencode = spawn('opencode', ['watch']);

    opencode.stdout.on('data', (data) => {
        let output = c.green(data);
        if (data.indexOf('Error') > -1) {
            output = c.bgRed(data);
        }
        process.stdout.write(output);
    });

    opencode.stderr.on('data', (data) => {
        process.stdout.write(c.bgRed(data));
    });
});

gulp.task('sass:watch', () => {
    return gulp.watch(CSSPATH + 'sass/**/*.scss', gulp.series('sass'));
});

gulp.task('less:watch', () => {
    return gulp.watch(CSSPATH + 'less/**/*.less', gulp.series('less'));
});

gulp.task('stylus:watch', () => {
    return gulp.watch(CSSPATH + 'stylus/**/*.styl', gulp.series('stylus'));
});

gulp.task('js:watch', () => {
    return gulp.watch(JSPATH + 'modules/**/*.js', gulp.series('js'));
});

gulp.task('img:watch', () => {
    // return gulp.watch(imageFiles, ['imagemin']);
});

gulp.task('watch', gulp.parallel(
    'sass:watch',
    'less:watch',
    'stylus:watch',
    'js:watch',
    'img:watch'
));

gulp.task('default', gulp.parallel(
    'watch',
    'opencode',
    'bsync', // comment this line if you're using remotes envs (Cloud 9, etc...)
 ));
