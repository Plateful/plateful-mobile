var nodemon       = require('gulp-nodemon');

module.exports = function(gulp){


  gulp.task('run:server', function(){

    nodemon({
      script: "server/app.js",
      ext: 'html js',
      ignore: ['ignored.js']
    })
    .on('restart', function(){
      console.log('restarted!')
    });
  })

  // gulp.task('build:server', ['compile:import'])

}