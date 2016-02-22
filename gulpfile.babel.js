/**
 * Created at 16/2/22.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import gulp from 'gulp';
import pconf from './package.json';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';
import less from 'gulp-less';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import plumber from 'gulp-plumber';
import cssnano from 'gulp-cssnano';
import changed from 'gulp-changed';
import pngquant from 'imagemin-pngquant';
import autoprefixer from 'autoprefixer';
import del from 'del';
import fs from 'fs';

const paths = {
  scripts: {
    src: 'assets-src/js/*.js',
    dest: 'assets/js'
  },
  less: {
    src: 'assets-src/css/*.less',
    dest: 'assets/css'
  },
  images: {
    src: 'assets-src/images/**/*.{jpg,jpeg,gif,svg,png}',
    dest: 'assets/images'
  },
  others: [{
    src: 'assets-src/fonts/**/*',
    dest: 'assets/fonts'
  }, {
    src: 'assets-src/css/*.css',
    dest: 'assets/css'
  }, {
    src: 'assets-src/lib/**/*',
    dest: 'assets/lib'
  }],
  clean: 'assets'
};

// 清理垃圾
gulp.task('clean', done => {
  del.sync([paths.clean]);
  done();
});

// js
gulp.task('scripts', () => {
  return gulp.src(paths.scripts.src)
    .pipe(babel(JSON.parse(fs.readFileSync('.babelrc'))))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
});

// eslint
gulp.task('lint', () => {
  return gulp.src([paths.scripts.src, '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format());
});

// less
gulp.task('less', () => {
  return gulp.src(paths.less.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([autoprefixer({
      browsers: [
        'last 2 version',
        '> 5%',
        'safari 5',
        'ios 6',
        'android 4']
    })]))
    .pipe(cssnano({rebase: false}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.less.dest));
});

// imagemin
gulp.task('imagemin', () => {
  return gulp.src(paths.images.src)
    .pipe(changed(paths.images.dest))
    .pipe(imagemin({
      progressive: true,
      use: [pngquant({speed: 10})]
    }))
    .pipe(gulp.dest(paths.images.dest));
});

// copy
gulp.task('copy', () => {
  return paths.others.map(each => {
    gulp.src(each.src).pipe(gulp.dest(each.dest));
  });
});

gulp.task('default', ['clean', 'scripts', 'less', 'copy', 'imagemin']);
gulp.task('watch', ['default'], () => {
  gulp.watch(paths.less.src, ['less']);
  gulp.watch(paths.scripts.src, ['scripts']);
  gulp.watch(paths.images.src, ['imagemin']);
});
gulp.task('serve', ['watch']);
gulp.task('build', ['default']);
