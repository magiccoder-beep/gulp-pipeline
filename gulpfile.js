import gulp from 'gulp';
import { exec } from 'child_process';
import minifycss from 'gulp-uglifycss';
import autoprefixer from 'gulp-autoprefixer';
import rtlcss from 'gulp-rtlcss';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import lineec from 'gulp-line-ending-corrector';
import gulpIf from 'gulp-if';
import htmlmin from 'gulp-htmlmin';
import filter from 'gulp-filter';
import sourcemaps from 'gulp-sourcemaps';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import fileinclude from 'gulp-file-include';
import htmlbeautify from 'gulp-html-beautify';
import plumber from 'gulp-plumber';
import cache from 'gulp-cache';
import remember from 'gulp-remember';
import beep from 'beepbeep';
import fs from 'fs';
import path from 'path';
import zip from 'gulp-zip';
import * as config from './wpgulp.config.mjs';

const isProd = process.env.NODE_ENV === 'prod';

const errorHandler = err => {
	notify.onError("\n\n❌  ===> ERROR: <%= error.message %>\n")(err);
	beep();
};

const createDirIfNotExists = dirPath => {
	if (dirPath && !fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
};

const browsersync = done => {
	browserSync.init({
		open: config.browserAutoOpen,
		injectChanges: config.injectChanges,
		server: {
			baseDir: [config.serverDir],
		},
		watchEvents: ['change', 'add', 'unlink', 'addDir', 'unlinkDir']
	});
	done();
};

const reload = done => {
	browserSync.reload();
	done();
};

const compileSass = (src, dest) => {
	return new Promise((resolve, reject) => {
		exec(`sass ${src} ${dest}`, (err, stdout, stderr) => {
			if (err) {
				reject(err);
			} else {
				console.log(stdout);
				resolve();
			}
		});
	});
};

gulp.task('html', () => {
	return gulp.src(config.htmlFile, { nodir: true })
		.pipe(fileinclude({
			prefix: '@@',
			basepath: 'html/src/partials/'
		}))
		.pipe(htmlbeautify())
		.pipe(gulpIf(isProd, htmlmin({
			collapseWhitespace: true
		})))
		.pipe(gulp.dest(config.htmlDest));
});

gulp.task('styles', () => {
	return compileSass('./assets/css/components.scss', './assets/css/components.css')
		.then(() => {
			return gulp
				.src('./assets/css/components.css', { allowEmpty: true })
				.pipe(plumber({ errorHandler }))
				.pipe(sourcemaps.init())
				.pipe(autoprefixer(config.BROWSERS_LIST))
				.pipe(sourcemaps.write('./'))
				.pipe(lineec())
				.pipe(gulp.dest(config.styleDestination))
				.pipe(filter('**/*.css'))
				.pipe(browserSync.stream())
				.pipe(rename({ suffix: '.min' }))
				.pipe(minifycss({ maxLineLen: 10 }))
				.pipe(lineec())
				.pipe(gulp.dest(config.styleDestination))
				.pipe(filter('**/*.css'))
				.pipe(browserSync.stream())
				.pipe(
					notify({
						message: "\n\n✅  ===> STYLES — completed!\n",
						onLast: true
					})
				);
		});
});

gulp.task('styles_single', () => {
	return compileSass(config.styleSRC, './assets/css/components.css')
		.then(() => {
			return gulp
				.src('./assets/css/components.css', { allowEmpty: true })
				.pipe(plumber({ errorHandler }))
				.pipe(sourcemaps.init())
				.pipe(autoprefixer(config.BROWSERS_LIST))
				.pipe(sourcemaps.write('./'))
				.pipe(lineec())
				.pipe(gulp.dest(config.styleDestination))
				.pipe(filter('**/*.css'))
				.pipe(browserSync.stream())
				.pipe(rename({ suffix: '.min' }))
				.pipe(minifycss({ maxLineLen: 10 }))
				.pipe(lineec())
				.pipe(gulp.dest(config.styleDestination))
				.pipe(filter('**/*.css'))
				.pipe(browserSync.stream())
				.pipe(
					notify({
						message: "\n\n✅  ===> STYLES — completed!\n",
						onLast: true
					})
				);
		});
});

gulp.task('stylesRTL', () => {
	return compileSass(config.styleSRC, './assets/css/components.css')
		.then(() => {
			return gulp
				.src('./assets/css/components.css', { allowEmpty: true })
				.pipe(plumber({ errorHandler }))
				.pipe(sourcemaps.init())
				.pipe(autoprefixer(config.BROWSERS_LIST))
				.pipe(lineec())
				.pipe(rename({ suffix: '-rtl' }))
				.pipe(rtlcss())
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest(config.styleDestination))
				.pipe(filter('**/*.css'))
				.pipe(browserSync.stream())
				.pipe(rename({ suffix: '.min' }))
				.pipe(minifycss({ maxLineLen: 10 }))
				.pipe(lineec())
				.pipe(gulp.dest(config.styleDestination))
				.pipe(filter('**/*.css'))
				.pipe(browserSync.stream())
				.pipe(
					notify({
						message: "\n\n✅  ===> STYLES RTL — completed!\n",
						onLast: true
					})
				);
		});
});

gulp.task('vendorsJS', () => {
	const vendorPath = config.jsVendorDestination;
	if (!fs.existsSync(vendorPath)) {
		fs.mkdirSync(vendorPath, { recursive: true });
	}

	return gulp
		.src(config.jsVendorSRC, { since: gulp.lastRun('vendorsJS') })
		.pipe(plumber({ errorHandler }))
		.pipe(remember(config.jsVendorSRC))
		.pipe(concat(config.jsVendorFile + '.js'))
		.pipe(lineec())
		.pipe(gulp.dest(vendorPath))
		.pipe(rename({ basename: config.jsVendorFile, suffix: '.min' }))
		.pipe(terser())
		.pipe(lineec())
		.pipe(gulp.dest(vendorPath))
		.pipe(
			notify({
				message: "\n\n✅  ===> VENDOR JS — completed!\n",
				onLast: true
			})
		);
});

gulp.task('parallaxJS', () => {
	return gulp
		.src(config.jsParallaxSRC, { since: gulp.lastRun('parallaxJS') })
		.pipe(plumber({ errorHandler }))
		.pipe(remember(config.jsParallaxSRC))
		.pipe(concat(config.jsParallaxFile + '.js'))
		.pipe(lineec())
		.pipe(gulp.dest(config.jsParallaxDestination))
		.pipe(rename({ basename: config.jsParallaxFile, suffix: '.min' }))
		.pipe(terser())
		.pipe(lineec())
		.pipe(gulp.dest(config.jsParallaxDestination))
		.pipe(
			notify({
				message: "\n\n✅  ===> PARALLAX JS — completed!\n",
				onLast: true
			})
		);
});

gulp.task('customJS', () => {
	return gulp
		.src(config.jsCustomSRC, { since: gulp.lastRun('customJS') })
		.pipe(plumber({ errorHandler }))
		.pipe(remember(config.jsCustomSRC))
		.pipe(concat(config.jsCustomFile + '.js'))
		.pipe(lineec())
		.pipe(gulp.dest(config.jsCustomDestination))
		.pipe(rename({ basename: config.jsCustomFile, suffix: '.min' }))
		.pipe(terser())
		.pipe(lineec())
		.pipe(gulp.dest(config.jsCustomDestination))
		.pipe(
			notify({
				message: "\n\n✅  ===> CUSTOM JS — completed!\n",
				onLast: true
			})
		);
});

gulp.task('images', () => {
	const imgDst = config.imgDST;
	createDirIfNotExists(imgDst); 

	return gulp
		.src(config.imgSRC, { since: gulp.lastRun('images') })
		.pipe(plumber({ errorHandler }))
		.pipe(cache(imagemin()))
		.pipe(gulp.dest(imgDst))
		.pipe(
			notify({
				message: "\n\n✅  ===> IMAGES — completed!\n",
				onLast: true
			})
		);
});

gulp.task('watch', () => {
	gulp.watch(config.htmlFile, gulp.series('html')).on('change', browserSync.reload);
	gulp.watch(config.styleSRC, gulp.series('styles')).on('change', browserSync.reload);
	gulp.watch(config.styleSRC, gulp.series('styles_single')).on('change', browserSync.reload);
	gulp.watch(config.styleSRC, gulp.series('stylesRTL')).on('change', browserSync.reload);
	gulp.watch(config.jsVendorSRC, gulp.series('vendorsJS')).on('change', browserSync.reload);
	gulp.watch(config.jsParallaxSRC, gulp.series('parallaxJS')).on('change', browserSync.reload);
	gulp.watch(config.jsCustomSRC, gulp.series('customJS')).on('change', browserSync.reload);
	gulp.watch(config.imgSRC, gulp.series('images')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series(
	gulp.parallel('html', 'styles', 'styles_single', 'stylesRTL', 'vendorsJS', 'parallaxJS', 'customJS', 'images'),
	browsersync,
	'watch'
));
