import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import cleanCSS from 'gulp-clean-css';
import plumber from 'gulp-plumber';
import { rollup } from 'rollup';
import rollupResolve from '@rollup/plugin-node-resolve';
import rollupCommonJS from '@rollup/plugin-commonjs';
import { babel as rollupBabel } from '@rollup/plugin-babel';

const sassCompiler = gulpSass(sass);

const paths = {
  scss: {
    main: 'src/scss/main.scss',
    components: ['src/scss/blocks/**/*.scss', 'src/scss/template/**/*.scss'],
    watchAll: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js',
    entry: 'src/js/main.js'
  }
};

export function stylesMain() {
  return gulp.src(paths.scss.main)
    .pipe(plumber({ errorHandler: err => console.error('Main SCSS Error:', err.message) }))
    .pipe(sourcemaps.init())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest));
}

export function stylesComponents() {
  return gulp.src(paths.scss.components, { base: 'src/scss' })
    .pipe(plumber({ errorHandler: err => console.error('Component SCSS Error:', err.message) }))
    .pipe(sourcemaps.init())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest));
}

export function scripts() {
  return rollup({
    input: paths.js.entry,
    plugins: [
      rollupResolve(),
      rollupCommonJS(),
      rollupBabel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env']
      })
    ]
  }).then(bundle => {
    return bundle.write({
      format: 'iife',
      file: `${paths.js.dest}/main.js`
    });
  });
}

export function watch() {
  stylesMain();
  stylesComponents();
  scripts();

  return gulp.parallel(
    () => gulp.watch(paths.scss.main, stylesMain).on('change', path => console.log('Main SCSS changed:', path)),
    () => gulp.watch(paths.scss.components, stylesComponents).on('change', path => console.log('Component SCSS changed:', path)),
    () => gulp.watch(paths.js.src, scripts).on('change', path => console.log('JS changed:', path))
  )();
}

export const build = gulp.series(stylesMain, stylesComponents, scripts);
export const buildDevTask = build;
export const buildProdTask = build;
