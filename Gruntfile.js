module.exports = function(grunt) {

  grunt.initConfig({
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: './server/app.js',
          // debug: true
        }
      }
    },
    jshint: {
      files:[ 'src/**/*.js', 'spec/**/*.js' ]
    },

    mochaTest: {
      files: ['src/**/*.js','spec/**/*.js']
    },

    watch: {
      scripts: {
        files: [ 'mobile-client/www/app/**/*.js','mobile-client/www/components/**/*.js' ],
        tasks: ['express:dev']
      },
      express: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Don't worry about this one - it just works. You'll see when you run `grunt`.
  grunt.loadNpmTasks('grunt-notify');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////
  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('default',['express:dev', 'express-keepalive'])

};
