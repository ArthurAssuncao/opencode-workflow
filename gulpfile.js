/**
 * Gulpfile
 * @author Richard Santos <rsantos@tray.com.br>
 */

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  minifyCSS = require("gulp-minify-css"),
  uglify = require("gulp-uglify"),
  path = require("path");

var SASSPATH, CSSPATH, JSPATH;

gulp.task('sass', function(){
  console.log(SASSPATH);
  console.log(CSSPATH);
  gulp.src(SASSPATH + '/theme.min.scss')
    .pipe(sass())
    .pipe(concat('theme.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(CSSPATH));
});

gulp.task('js', function(){
  gulp.src(JSPATH + "/*.js")
    .pipe(concat("theme.min.js"))
    .pipe(uglify({"compress": false}))
    .pipe(gulp.dest(path.resolve(JSPATH, "../")));
});

// watchers
var cssWatcher = gulp.watch('**/*.scss', ['sass']);
cssWatcher.on("change", function(event) {
  SASSPATH = path.resolve(event.path, "../");
  CSSPATH  = path.resolve(event.path, "../../");
});

var jsWatcher = gulp.watch('**/js/modules/*.js', ['js']);
jsWatcher.on("change", function(event) {
  JSPATH = path.resolve(event.path, "../");
});

gulp.task("default");