var gulp = require('gulp'),
merge = require('merge-stream'),
// sass = require('gulp-sass'),
sass = require('gulp-sass')(require('node-sass'))
less = require('gulp-less'),
fs = require('fs'),
path = require('path'),
streamify = require('gulp-streamify'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
browserify = require('browserify'),
babelify = require('babelify'),
sourcemaps = require('gulp-sourcemaps'),
babel = require('gulp-babel'),
source = require('vinyl-source-stream'),
gutil = require('gulp-util'),
jshint = require('gulp-jshint'),
stylish = require('jshint-stylish'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
clean = require('gulp-clean'),
concat = require('gulp-concat'),
gutil = require('gulp-util'),
// notify = require('gulp-notify'),
sourcemaps = require('gulp-sourcemaps');

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}

let projectList = [ '' ];

const projects = fs.readdirSync('projects');

projects.forEach(function(project){
    if (fs.lstatSync(`projects/${ project }`).isDirectory()){
        let configFilePath = `${ __dirname }/projects/${ project }/config.json`;

        if (fs.existsSync(configFilePath)){
            projectList.push(`projects/${ project }`);
        } else {
            projectSubfolders = fs.readdirSync(`projects/${ project }`);
            projectList = projectList.concat(projectSubfolders.map(function(subfolder){
                if (fs.lstatSync(`projects/${ project }/${ subfolder }`).isDirectory()){
                    return `projects/${ project }/${ subfolder }`;
                } else {
                    return null;
                }
            }));
        }
    }
});

projectList = projectList.filter(function(project){
    return project !== null;
});

console.log('projects found:', projectList);

gulp.task('styles', function() {
    let tasks = projectList.map(function(project){
        return gulp.src( `${ project && project.length ? project + '/' : '' }src/styles/*.scss`)
        .pipe(sass({
            paths: [ path.join(__dirname, 'scss', 'includes') ]
        }))
        .on('error', swallowError)
        .pipe(autoprefixer('last 3 version', 'android >= 3', { cascade: true }))
        .on('error', swallowError)
        .pipe(gulp.dest(`public/css/${project}`, { mode: 0o777 }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .on('error', swallowError)
        .pipe(gulp.dest(`public/css/${project}`, { mode: 0o777 }))
        // .pipe(reload({stream:true}));
    });

    return merge(tasks);
});

gulp.task('scripts', function() {
    let tasks = projectList.map(function(project){
        return gulp.src(`${ project && project.length ? project + '/' : '' }src/js/**/*.js`)
        .pipe(sourcemaps.init({compress: false}))
        // .pipe(babel({
        //     presets: ['@babel/preset-env']
        // }))
        .on('error', swallowError)
        // .pipe(concat('scripts.js'))
        // .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`public/js${ project && project.length ? '/' + project : '' }`, {mode: 0o777}));
    });

    return merge(tasks);
});

gulp.task('jslint', function(){
    let tasks = projectList.map(function(project){
        return gulp.src(`${ project && project.length ? project + '/' : '' }src/js/**/*.js`)
        .pipe(jshint('tests/.jshintrc'))
        .on('error', gutil.noop)
        .pipe(jshint.reporter(stylish))
        .on('error', swallowError);
    });

    return merge(tasks);



    return gulp.src([
        './src/scripts/**/*.js'
        ])
    .pipe(jshint('tests/.jshintrc'))
    .on('error',gutil.noop)
    .pipe(jshint.reporter(stylish))
// .pipe(jshint.reporter('default'))
.on('error', swallowError);
});

gulp.task('watch', function() {
    projectList.forEach(function(project ){
        gulp.watch(`${ project && project.length ? project + '/' : '' }src/styles/**/*.*`, ['styles']);
        gulp.watch(`${ project && project.length ? project + '/' : '' }src/js/**/*.*`, ['jslint', 'scripts']);
        // gulp.watch(`${ project && project.length ? project + '/' : '' }src/js/**/*.*`, ['scripts']);
    });
});

// gulp.task('default', ['clean'], function() {
    gulp.task('default', [], function() {
// gulp.start('styles', 'jslint', 'scripts', 'watch');
    gulp.start('styles', 'scripts', 'watch');
});