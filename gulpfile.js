var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	autoprefixer = require('gulp-autoprefixer'),
	sourcemap = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	replace = require('gulp-html-replace'),
	eslint = require('gulp-eslint');

var jsOrder = [
	'./app/app.module.js',
	'./app/**/*.module.js',
	'./app/**/*.controller.js',
	'./app/**/*.js'
];

gulp.task('copy-html', function() {
	gulp.src('index.html')
		.pipe(gulp.dest('./dist'))
		.pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
	gulp.src(jsOrder)
		.pipe(sourcemap.init())
			.pipe(concat('all.js'))
			.pipe(gulp.dest('js'))
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(uglify())
		.pipe(sourcemap.write())
		.pipe(gulp.dest('js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(reload({stream:true}));
});

gulp.task('lint', function() {
	gulp.src(jsOrder)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('styles', function() {
	gulp.src('./sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(gulp.dest('css'))
		.pipe(reload({stream:true}));
});

gulp.task('serve', function(){
	browserSync.init({
		server: './dist'
	});

	gulp.watch('index.html', ['copy-html']);
	gulp.watch('./sass/**/*.scss', ['styles']);
	gulp.watch(jsOrder, ['lint', 'scripts']);
});

gulp.task('default', ['copy-html', 'styles', 'lint', 'scripts', 'serve']);