const gulp = require('gulp');
const mocha = require('gulp-mocha');
const exec = require('child_process').exec;
const bs = require('browser-sync');

const src = {
  js: ['lib2/**/*.js'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']
};

const index = './bin/aigis';

const execIndex = (cb) => {
  exec(`node ${index} run -c ./examples/aigis_config.yml`, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb();
  });
};

gulp.task('exec:index', execIndex);

gulp.task('watch', function () {
  return gulp.watch(src.js, ['exec:index']);
});

gulp.task('serve', function () {
  bs.init({
    server: {
      baseDir: ['./examples'],
      directory: true
    },
    notify: false,
    host: 'localhost'
  });
});

gulp.task('test', () => {
  return gulp.src('test/**/*.js', {read: false}).pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', execIndex);
