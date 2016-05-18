var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
    var error = false;
    gulp.
    src('./spec/aggregator.spec.js').
    pipe(mocha()).
    on('error', function() {
        console.log('Tests failed!');
        error = true;
    });
    /*.
    on('end', function() {
        if (!error) {
            console.log('Tests succeeded!');
            process.exit(0);
        }
    });*/
});

gulp.task('watch', function() {
    gulp.watch(['./spec/aggregator.spec.js', './src/aggregator.js'], ['test']);
});