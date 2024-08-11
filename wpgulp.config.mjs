// Project options.
export const projectURL = 'noname.local';
export const productURL = './';
export const browserAutoOpen = true;
export const injectChanges = true;

// >>>>> Style options.
export const styleSRC = './assets/css/components.scss';
export const styleDestination = './html/dist/assets/css/';
export const styleDestinationAlt = './assets/dist/css/';
export const jsVendorDestinationAlt = './assets/dist/js/';
export const jsCustomDestinationAlt = './assets/dist/js/';
export const imgDSTAlt = './assets/dist/img/';
export const outputStyle = 'compact';
export const errLogToConsole = true;
export const precision = 10;

// JS Vendor options.
export const jsVendorSRC = './assets/js/vendor/*.js';
export const jsVendorDestination = './html/dist/assets/js/';
export const jsVendorFile = 'vendor';

// JS Parallax options.
export const jsParallaxSRC = './assets/js/parallax/*.js';
export const jsParallaxDestination = './html/dist/assets/js/';
export const jsParallaxFile = 'parallax';

// JS Custom options.
export const jsCustomSRC = './assets/js/custom/*.js';
export const jsCustomDestination = './html/dist/assets/js/';
export const jsCustomFile = 'custom';

// Images options.
export const imgSRC = './assets/img/**/*';
export const imgDST = './html/dist/assets/img/';

// >>>>> Watch files paths.
export const watchStyles = './assets/css/**/*.scss';
export const watchJsVendor = './assets/js/vendor/*.js';
export const watchJsParallax = './assets/js/parallax/*.js';
export const watchJsCustom = './assets/js/custom/*.js';
export const watchPhp = './**/*.php';

// >>>>> Zip file config.
export const zipName = 'file.zip';
export const zipDestination = './';
export const zipIncludeGlob = ['./**/*'];
export const zipIgnoreGlob = [
	'!./{node_modules,node_modules/**/*}',
	'!./.git',
	'!./.svn',
	'!./gulpfile.js',
	'!./wpgulp.config.mjs',
	'!./.eslintrc.js',
	'!./.eslintignore',
	'!./.editorconfig',
	'!./phpcs.xml.dist',
	'!./vscode',
	'!./package.json',
	'!./package-lock.json',
	'!./assets/css/**/*',
	'!./assets/css',
	'!./assets/img/**/*',
	'!./assets/img',
	`!${imgSRC}`,
	`!${styleSRC}`,
	`!${jsCustomSRC}`,
	`!${jsVendorSRC}`
];

// >>>>> Translation options.
export const textDomain = 'noname';
export const translationFile = 'noname.pot';
export const translationDestination = './languages';
export const packageName = 'noname';
export const bugReport = '';
export const lastTranslator = '';
export const team = 'NoName <info@noname.dk>';

// Browsers you care about for auto-prefixing.
export const BROWSERS_LIST = ['last 2 version', '> .5%'];
export const serverDir = './html/dist';
export const htmlFile = './html/src/*';
export const htmlDest = './html/dist';
