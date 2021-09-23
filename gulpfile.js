const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const minCss = require("gulp-minify-css");
const rename = require("gulp-rename");

gulp.task("styles", function() {
  return gulp
    .src("./sass/**/*.scss")
    .pipe(
      sass({
        outputStyle: "expanded"
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(gulp.dest("./dist/"))
    .pipe(minCss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("clean", () => {
  return del(["css/main.css"]);
});

gulp.task("watch", () => {
  gulp.watch("sass/**/*.scss", done => {
    gulp.series(["clean", "styles"])(done);
  });
});

gulp.task("default", gulp.series(["clean", "styles"]));
