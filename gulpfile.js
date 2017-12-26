var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sassbeautify = require('gulp-sassbeautify');
var imageResize = require('gulp-image-resize');
var semi = require('gulp-semi').add;
var $ = require("gulp-load-plugins")({
        lazy: true
    })
    // Static Server + watching scss/html files
var config = require("./config")

gulp.task('serve', ['sass'], function() {

    if (browserSync.isActive) {
        return browserSync.reload();
    }
    browserSync.init({
        server: "./public"
    });
    gulp.watch("./public/**/*.html").on('change', browserSync.reload);
    gulp.watch("./public/**/*.template").on('change', browserSync.reload);
    gulp.watch("./public/**/*.js").on('change', browserSync.reload);
    gulp.watch("./public/scss/**/*.scss", ['sass']);

});

// Compile sass into CSS & auto-inject into browsers

gulp.task('sass', function() {
    return gulp.src("./public/scss/**/*.scss")
        .pipe(sass())
        .pipe(sassbeautify())
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream());
});

gulp.task("imagemin", function() {
    return gulp.src("./public/img/**/*.*")
        .pipe($.imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest("./build/img"))
})

var unretina = require('gulp-unretina');

gulp.task('unretina', function() {

    return gulp.src('./public/img/work/**/*.png')

    .pipe(unretina())

    .pipe(gulp.dest('./distunretina'));
});



gulp.task('imageResize', function() {
    return gulp.src('./public/img/work/**/*.png')
        .pipe(imageResize({
            width: 960,
            // height : 100,
            // crop : true,
            upscale: false
        }))
        .pipe(gulp.dest('./build/img/work'));
});

gulp.task("csso", function() {
    return gulp.src(config.gulp.css)
        .pipe($.csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest('./build' + '/css'));
})

gulp.task("uglify", function() {
    return gulp.src(config.gulp.temp + "/app.js")
        .pipe($.plumber())
        .pipe($.uglify())
        .pipe(gulp.dest(config.gulp.build + "/app"))
})

gulp.task("concat", ["semi"], function() {
    return gulp
        .src(config.gulp.temp+"/app/*.js")
        .pipe($.concat('app.js'))
        .pipe(gulp.dest(config.gulp.temp));
})

gulp.task('semi', function() {
    return gulp
        .src(["./public/app/services/*.js","./public/app/controller/*.js","!./public/app/controller/loginController.js","./public/app/app.js"])
        .pipe($.print())
        .pipe($.plumber())
        .pipe(semi({
            leading: true
        }))
        .pipe(gulp.dest("./temp/app"));
});

gulp.task("minify-html", function() {
    return gulp.src(config.gulp.html)
        .pipe($.htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(config.gulp.build + "/templates"))

})

gulp.task("optimize", ["minify-html", "csso", "imagemin", "uglify"])


gulp.task('nodemon', ["serve"], function(cb) {
    var called = false;
    return $.nodemon({
            script: './server/app.js',
            ignore: [
                'gulpfile.js',
                'node_modules/'
            ]
        })
        .on('start', function() {
            if (!called) {
                called = true;
                cb();
            }
        })
        .on('restart', function() {
            setTimeout(function() {
                browserSync.reload({
                    stream: false
                });
                browserSync.reload()
            }, 1000);
        });
});


gulp.task("default", ["nodemon"])