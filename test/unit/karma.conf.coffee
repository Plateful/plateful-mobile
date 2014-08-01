module.exports = (config) ->
  config.set
    basePath: '../../'
    frameworks: ['mocha', 'chai', 'chai-as-promised', 'sinon-chai', 'chai-things']

    # list of files / patterns to load in the browser
    files: [
      "http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"
      "www/js/vendor.js"
      "assets/components/angular-mocks/angular-mocks.js"

      # "www/templates/**/*.html"

      "test/unit/tests-config.coffee"


      # This is the copy from gulpfile.coffee - you need to keep it up to date.
      'app/js/config/bootstrap.coffee'
      'app/js/App.coffee'
      'app/js/*/**/*.coffee'
      'app/js/config/app_run.coffee'
      "www/js/**/*.js"

      "test/unit/helpers/**/*.coffee"
      "test/unit/**/*.coffee"
    ]

    exclude: [
      "test/unit/karma.conf.coffee"
    ]

    # use dots reporter, as travis terminal does not support escaping sequences
    # possible values: 'dots', 'progress'
    # CLI --reporters progress
    # reporters: ['progress']

    autoWatch: true

    # f.e. Chrome, PhantomJS
    browsers: ['Chrome']

    reporters: ['osx', 'progress']

    preprocessors:
      '**/*.coffee': ['coffee']
      'www/**/*.html': ['ng-html2js']

    ngHtml2JsPreprocessor:
      stripPrefix: 'www/'
      moduleName: 'app'

    coffeePreprocessor:
      options:
        bare: true
        sourceMap: true

      # transformPath: (path) ->
      #   path.replace(/\.coffee$/, '.js')
