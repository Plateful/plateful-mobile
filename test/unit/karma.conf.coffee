module.exports = (config) ->
  config.set
    basePath: '../../'
    frameworks: ['mocha', 'chai', 'chai-as-promised', 'sinon-chai', 'chai-things']

    # list of files / patterns to load in the browser
    files: [
      "www/js/vendor.js"
      "assets/components/angular-mocks/angular-mocks.js"

      "www/templates/**/*.html"

      "test/unit/tests-config.coffee"

      # "www/js/app.js"
      # This is the copy from gulpfile.coffee - you need to keep it up to date.
      'app/js/bootstrap.coffee'
      'app/js/app_config.coffee'
      'app/js/*/**/*.coffee'
      'app/js/routes.coffee'
      'app/js/app_run.coffee'
      
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
      'www/templates/**/*.html': ['ng-html2js']

    ngHtml2JsPreprocessor:
      stripPrefix: 'www/'
      moduleName: 'ionicstarter-templates'

    coffeePreprocessor:
      options:
        bare: true
        sourceMap: true

      # transformPath: (path) ->
      #   path.replace(/\.coffee$/, '.js')
