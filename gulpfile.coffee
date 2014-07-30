Q             = require 'q'
child_process = require 'child_process'
connect       = require 'gulp-connect'
gulp          = require 'gulp'
gutil         = require 'gulp-util'
sass          = require 'gulp-sass'
coffee        = require 'gulp-coffee'
jade          = require 'gulp-jade'
livereload    = require 'gulp-livereload'
changed       = require 'gulp-changed'
ripple        = require 'ripple-emulator'
open          = require 'open'
http          = require 'http'
path          = require 'path'
ecstatic      = require 'ecstatic'
notify        = require 'gulp-notify'
concat        = require 'gulp-concat'
clean         = require 'gulp-clean'
cache         = require 'gulp-cache'
ejs           = require 'gulp-ejs'
shell         = require 'gulp-shell'
protractor    = require 'gulp-protractor'
runSequence   = require 'run-sequence'
nodemon       = require 'gulp-nodemon'

APP_ROOT = require("execSync").exec("pwd").stdout.trim() + "/"

# Used in "development" environment as a IP for the server.
# You can specify it by using LOCAL_IP env variable in your cli commands.
LOCAL_IP = process.env.LOCAL_IP || require('execSync').exec("(ifconfig wlan 2>/dev/null || ifconfig en0) | grep inet | grep -v inet6 | awk '{print $2}' | sed 's/addr://g'").stdout.trim()
LOCAL_IP = "127.0.0.1" unless parseInt(LOCAL_IP) > 0


ENV_GLOBALS =
  development:
    ENV: "development"

    BUNDLE_ID: "com.jtomaszewski.ionicstarter.development"
    BUNDLE_NAME: "clurtch"
    BUNDLE_VERSION: "1.0.0"

    BACKEND_URL: "http://#{LOCAL_IP}:9000"
    SECURE_BACKEND_URL: "http://#{LOCAL_IP}:9000"

    # Automatically connect to weinre on application's startup
    # (this way you can debug your application on your PC even if it's running from mobile ;) )
    WEINRE_ADDRESS: "#{LOCAL_IP}:31173"

    BUILD_DIR: "www"
    CORDOVA_PLATFORM: process.env.CORDOVA_PLATFORM || gulp.env.platform

  production:
    ENV: "production"

    BUNDLE_ID: "com.jtomaszewski.ionicstarter.production"
    BUNDLE_NAME: "clurtch"

    BACKEND_URL: "https://clurtch-v1.azurewebsites.net"
    WEINRE_ADDRESS: null

    # If those 2 variables are defined, the app will be deployed to the remote server after compiling the release.
    ANDROID_DEPLOY_APPBIN_PATH: "deploy@ionicstarter.com:/u/apps/ionicstarter/shared/public/uploads/ionicstarter-production.apk"
    ANDROID_DEPLOY_APPBIN_URL: "http://ionicstarter.com/uploads/ionicstarter-production.apk"

    # If those 2 variables are defined, the app will be deployed to the remote server after compiling the release.
    IOS_DEPLOY_APPBIN_PATH: "deploy@ionicstarter.com:/u/apps/ionicstarter/shared/public/uploads/ionicstarter-production.ipa"
    IOS_DEPLOY_APPBIN_URL: "http://ionicstarter.com/uploads/ionicstarter-production.ipa"

    # Required for the release to be signed with correct certificate.
    IOS_PROVISIONING_PROFILE: "keys/ios/ionicstarterstaging.mobileprovision"

    # GOOGLE_ANALYTICS_ID: "UA-123123-1"
    # GOOGLE_ANALYTICS_HOST: "ionicstarter.com"

    # If defined, we'll deploy the app to testflight after compiling the release.
    # TESTFLIGHT_API_TOKEN: "123"
    # TESTFLIGHT_TEAM_TOKEN: "456"

GLOBALS = require('extend') true, {}, ENV_GLOBALS.development, (ENV_GLOBALS[gutil.env.env] || {})

GLOBALS.CACHE_TAG = Date.now()

# You can replace any of GLOBALS by defining ENV variable in your command line,
# f.e. `BACKEND_URL="http://192.168.0.666:1337" gulp`
for k, v of GLOBALS
  GLOBALS[k] = process.env[k] if process.env[k]? && GLOBALS[k]?

# In summary, GLOBALS are build in this way:
# 1) Take the defaults (GLOBALS.development)
# 2) Merge with current GLOBALS[env] (f.e. GLOBALS.staging)
# 3) Replace existing GLOBALS with existing and matched ENV variables.

# Only those will be actually passed into the frontend's application
# (the rest of globals are used only during the compilation in gulp and shell scripts)
PUBLIC_GLOBALS_KEYS = [
  "ENV"
  "BACKEND_URL"
  "BUNDLE_NAME"
  "CACHE_TAG"
  "CORDOVA_GOOGLE_ANALYTICS_ID"
  "FB_APP_ID"
  "GOOGLE_ANALYTICS_HOST"
  "GOOGLE_ANALYTICS_ID"
  "WEINRE_ADDRESS"
]


paths =
  assets: ['assets/**', '!assets/**/*.ejs']
  assets_ejs: ['assets/**/*.ejs']
  styles: ['app/css/**/*.scss']
  server: ['server_coffee/**/*.coffee']
  import: ['import_server/**/*.coffee']
  scripts:
    vendor: [
      "assets/components/ionic/release/js/ionic.js"
      "assets/components/angular/angular.js"
      "assets/components/lodash/dist/lodash.js"
      "assets/components/angular-google-maps/dist/angular-google-maps.min.js"
      "assets/components/angular-animate/angular-animate.js"
      "assets/components/angular-sanitize/angular-sanitize.js"
      "assets/components/gsap/src/minified/TweenMax.min.js"
      "assets/components/ng-Fx/dist/ngFx.min.js"
      "assets/components/angular-ui-router/release/angular-ui-router.js"
      "assets/components/restangular/dist/restangular.js"
      "assets/components/ionic/release/js/ionic-angular.js"
      "assets/components/angularjs-google-places/dist/angularjs-google-places.min.js"
      # "assets/components/angularjs-google-places/src/angularjs-google-places.js"
      # "assets/components/angularjs-google-places/src/google-api.js"
      "assets/components/ion-google-place/ion-google-place.js"
      # Here add any vendor files that should be included in vendor.js
      # (f.e. bower components)
    ]
    bootstrap: [
      'app/js/config/bootstrap.coffee'
    ]
    app: [
      'app/js/App.coffee' # define application's angular module; add some native/global js variables
      'app/js/*/**/*.coffee'  # include all angular submodules (like controllers, directives, services)
      # 'app/js/routes.coffee'  # app.config - routes
      'app/js/config/app_run.coffee' # app.config; app.run
    ]
    tests: [
      'tests/**/*.coffee'
    ]
  templates: ['app/**/*.jade']

destinations =
  assets: "#{GLOBALS.BUILD_DIR}"
  styles: "#{GLOBALS.BUILD_DIR}/css"
  scripts: "#{GLOBALS.BUILD_DIR}/js"
  templates: "#{GLOBALS.BUILD_DIR}"
  server: 'run'
  import: 'import'
  livereload: [
    'run/**'
    "#{GLOBALS.BUILD_DIR}/assets/**"
    "#{GLOBALS.BUILD_DIR}/css/**"
    "#{GLOBALS.BUILD_DIR}/fonts/**"
    "#{GLOBALS.BUILD_DIR}/img/**"
    "#{GLOBALS.BUILD_DIR}/js/**"
    "#{GLOBALS.BUILD_DIR}/templates/**"
    "#{GLOBALS.BUILD_DIR}/*.html"
  ]

options =
  open: gulp.env.open || process.env['OPEN'] || false # open the server in the browser on init?
  httpPort: 4400
  riddlePort: 4400


gulp.task 'clean', ->
  gulp.src(GLOBALS.BUILD_DIR, read: false)
    .pipe(clean(force: true))
  gulp.src('run', read: false)
    .pipe(clean(force: true))


gulp.task 'bower:install', shell.task('bower install')


gulp.task 'assets:ejs', ->
  gulp.src(paths.assets_ejs)
    .pipe(ejs(GLOBALS, ext: ''))
    .pipe(gulp.dest(destinations.assets))

gulp.task 'assets:others', ->
  gulp.src(paths.assets)
    .pipe(changed(destinations.assets))
    .pipe(gulp.dest(destinations.assets))

gulp.task 'assets', ['assets:ejs', 'assets:others']


gulp.task 'styles', ->
  gulp.src(paths.styles)
    .pipe(changed(destinations.styles, extension: '.css'))
    .pipe(sass({
      # Temporarily commented out because of this issue:
      # https://github.com/sass/node-sass/issues/337
      # sourceComments: 'map'
    }))
    .on('error', notify.onError((error) -> error.message))
    .pipe(gulp.dest(destinations.styles))


gulp.task 'scripts:vendor', ->
  gulp.src(paths.scripts.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(destinations.scripts))


# Define scripts:app, scripts:bootstrap tasks
['app', 'bootstrap'].forEach (scriptsName) ->
  gulp.task "scripts:#{scriptsName}", ->
    gulp.src(paths.scripts[scriptsName])
      # .pipe(changed(destinations.scripts))
      # copy .coffee to www/ also, because sourcemap links to sources with relative path
      # .pipe(gulp.dest(destinations.scripts))
      .pipe(coffee({
        # sourcemaps arent ready for gulp-concat yet :/ lets wait with that
        sourceMap: false
      }))
      .on("error", notify.onError((error) -> error.message))
      .pipe(concat("#{scriptsName}.js"))
      .pipe(gulp.dest(destinations.scripts))


gulp.task 'compile:server', ->
  gulp.src(paths.server)
    .pipe(coffee({sourceMap: false}))
    .on("error", notify.onError((error)-> error.message))
    .pipe(gulp.dest(destinations.server))
gulp.task 'compile:import', ->
  gulp.src(paths.import)
    .pipe(coffee({sourceMap: false}))
    .on("error", notify.onError((error)-> error.message))
    .pipe(gulp.dest(destinations.import))


gulp.task 'run:import', ->
  # nodemon(
  #   script: "import/app.js",
  #
  #   # ext: 'html js',
  #   ignore: ['ignored.js']
  # )
  # .on('restart', ->
  #   console.log 'restarted!'
  # )
gulp.task 'run:server', ->
  nodemon(
    script: "run/app.js",
    ext: 'html js',
    ignore: ['ignored.js']
  )
  .on('restart', ->
    console.log 'restarted!'
  )

gulp.task 'build:server', ['compile:server', 'compile:import']

gulp.task "scripts:cordova", ->
  gulp.src("assets/components/cordova/ng-cordova.js")
    .pipe(gulp.dest(destinations.scripts))


gulp.task 'scripts', ['scripts:vendor', 'scripts:app', 'scripts:bootstrap', 'scripts:cordova']


gulp.task 'templates', ->
  template_globals = {}
  for key in PUBLIC_GLOBALS_KEYS
    template_globals[key] = GLOBALS[key] if GLOBALS[key]

  gulp.src(paths.templates)
    .pipe(changed(destinations.templates, extension: '.html'))
    .pipe(jade({
      locals:
        GLOBALS: template_globals
      pretty: true
    }))
    .on('error', notify.onError((error) -> error.message))
    .pipe(gulp.dest(destinations.templates))

phantomChild = null
phantomDefer = null


# standalone test server which runs in the background.
# doesnt work atm - instead, run `webdriver-manager start`
gulp.task 'test:e2e:server', (cb) ->
  return cb() if phantomDefer
  phantomDefer = Q.defer()

  phantomChild = child_process.spawn('phantomjs', ['--webdriver=4444'], {
  })
  phantomChild.stdout.on 'data', (data) ->
    gutil.log gutil.colors.yellow data.toString()
    if data.toString().match 'running on port '
      phantomDefer.resolve()

  phantomChild.once 'close', ->
    gutil.log "phantomChild closed"
    phantomChild.kill() if phantomChild
    phantomDefer.reject()

  phantomChild.on 'exit', (code) ->
    gutil.log "phantomChild exitted"
    phantomChild.kill() if phantomChild

  phantomDefer.promise

gulp.task 'test:e2e:prepare', (cb) ->
  child_process.exec "rake test:seed RAILS_ENV=development",
    cwd: "../rails"
  , (error, stdout, stderr) ->
    cb(error)

# You can run it like this:
# `gulp test:e2e` - runs all e2e tests
# `gulp test:e2e --debug --specs tests/map_test.coffee` - runs only one test, in debug mode
gulp.task 'test:e2e', ['test:e2e:prepare'], ->
  args = ['--baseUrl', "http://localhost:#{options.httpPort}"]
  args.push 'debug' if gulp.env.debug

  protractorTests = paths.scripts.tests
  protractorTests = gulp.env.specs.split(',') if gulp.env.specs

  gulp.src(protractorTests)
    .pipe(protractor.protractor({
      configFile: "tests/protractor.config.js",
      args: args
    }))
    .on('error', (notify.onError((error) -> error.message)))

# Runs unit tests using karma.
# You can run it simply using `gulp test:unit`.
# You can also pass some karma arguments like this: `gulp test:unit --browsers Chrome`.
gulp.task 'test:unit', ->
  args = ['start', 'test/unit/karma.conf.coffee']
  for name in ['browsers', 'reporters']
    args.push "--#{name}", "#{gulp.env[name]}" if gulp.env.hasOwnProperty(name)

  child_process.spawn "node_modules/.bin/karma", args, stdio: 'inherit'


gulp.task 'watch', ->
  if process.env.GULP_WATCH_ASSETS # this makes some bug with descriptors on mac, so let's enable it only when specified ENV is defined
    gulp.watch(paths.assets, ['assets'])
  gulp.watch(paths.assets_ejs, ['assets_ejs'])
  gulp.watch(paths.scripts.app, ['scripts:app'])
  gulp.watch(paths.scripts.bootstrap, ['scripts:bootstrap'])
  gulp.watch(paths.scripts.vendor, ['scripts:vendor'])
  gulp.watch(paths.styles, ['styles'])
  gulp.watch(paths.templates, ['templates'])
  gulp.watch(paths.server, ['compile:server'])

  livereloadServer = livereload()
  gulp.watch(destinations.livereload).on 'change', (file) ->
    livereloadServer.changed(file.path)


gulp.task 'emulator', ->
  ripple.emulate.start(options)
  gutil.log gutil.colors.blue "Ripple-Emulator listening on #{options.ripplePort}"
  if options.open
    url = "http://localhost:#{options.ripplePort}/?enableripple=cordova-3.0.0-HVGA"
    open(url)
    gutil.log gutil.colors.blue "Opening #{url} in the browser..."


gulp.task 'server', ->
  http.createServer(ecstatic(root: GLOBALS.BUILD_DIR)).listen(options.httpPort)
  gutil.log gutil.colors.blue "HTTP server listening on #{options.httpPort}"
  if options.open
    url = "http://localhost:#{options.httpPort}/"
    open(url)
    gutil.log gutil.colors.blue "Opening #{url} in the browser..."


gulp.task "weinre", ->
  [weinreHost, weinrePort] = GLOBALS.WEINRE_ADDRESS.split(":")

  args = ["--httpPort=#{weinrePort}", "--boundHost=#{weinreHost}"]
  child = child_process.spawn "node_modules/.bin/weinre", args,
    stdio: "inherit"
  # .on "exit", (code) ->
  #   child.kill() if child
  #   cb(code)

  if options.open
    open("http://#{weinreHost}:#{weinrePort}/client/#anonymous")
    gutil.log gutil.colors.blue "Opening weinre debugger in the browser..."



# Clean all cordova platforms, so they will need to be generated again.
gulp.task "cordova:clear", shell.task('rm -rf plugins/* platforms/*')

# Create cordova platform.
["ios", "android"].forEach (platform) ->
  gulp.task "cordova:platform-add:#{platform}", ['build'], shell.task("env \
      BUNDLE_ID=\"#{GLOBALS.BUNDLE_ID}\" \
      FB_APP_ID=\"#{GLOBALS.FB_APP_ID}\" \
      FB_APP_NAME=\"#{GLOBALS.FB_APP_NAME}\" \
      node_modules/.bin/cordova platform add #{platform}", ignoreErrors: true)

  # Build and emulate.
  gulp.task "cordova:emulate:#{platform}", ["cordova:platform-add:#{platform}", "build-debug"], shell.task("env \
      BUNDLE_VERSION=\"#{GLOBALS.BUNDLE_VERSION}\" \
      BUNDLE_NAME=\"#{GLOBALS.BUNDLE_NAME}\" \
      node_modules/.bin/cordova emulate #{platform}")

  # Build and run on connected device.
  gulp.task "cordova:run:#{platform}", ["cordova:platform-add:#{platform}", "build-debug"], shell.task("env \
      BUNDLE_VERSION=\"#{GLOBALS.BUNDLE_VERSION}\" \
      BUNDLE_NAME=\"#{GLOBALS.BUNDLE_NAME}\" \
      node_modules/.bin/cordova run #{platform} --device")

  # Same as cordova:run, but use release version, not debug.
  gulp.task "cordova:run-release:#{platform}", ["cordova:platform-add:#{platform}", "build"], shell.task("env \
      BUNDLE_VERSION=\"#{GLOBALS.BUNDLE_VERSION}\" \
      BUNDLE_NAME=\"#{GLOBALS.BUNDLE_NAME}\" \
      node_modules/.bin/cordova run #{platform} --device --release")

  # Build a release.
  gulp.task "cordova:build-release:#{platform}", ["cordova:platform-add:#{platform}", "build"], shell.task("env \
      BUNDLE_VERSION=\"#{GLOBALS.BUNDLE_VERSION}\" \
      BUNDLE_NAME=\"#{GLOBALS.BUNDLE_NAME}\" \
      node_modules/.bin/cordova build #{platform} --release --device")


# Sign the release.
gulp.task "cordova:sign-release:android", []

gulp.task "cordova:sign-release:ios", shell.task("xcrun -sdk iphoneos PackageApplication \
  -v platforms/ios/build/device/#{GLOBALS.BUNDLE_NAME}.app \
  -o #{APP_ROOT}platforms/ios/#{GLOBALS.BUNDLE_NAME}.ipa \
  --sign \"#{process.env.IOS_SIGN_KEY}\" \
  --embed #{GLOBALS.IOS_PROVISIONING_PROFILE}")


# Deploy the release's binary to webserver.
open_qrcode_cmd = (url) ->
  "curl -s --include \
  --request GET 'https://pierre2106j-qrcode.p.mashape.com/api?type=text&text=#{encodeURIComponent(url)}&ecl=L%20%7C%20M%7C%20Q%20%7C%20H&pixel=8&forecolor=000000&backcolor=ffffff' \
  --header \"X-Mashape-Authorization: xWzeUXHELgVCXp9L4iK3epFzvsTECUai\" | tail -n 1 | xargs open"

deploy_release_cmd = (from, to, to_url) ->
  "scp \
    #{from} #{to} \
    && echo \"App has been deployed to #{to_url} .\"\
    " + (if options.open then " && #{open_qrcode_cmd(to_url)}" else "")


android_release_file = "platforms/android/ant-build/#{GLOBALS.BUNDLE_NAME}-release.apk"
cmd = deploy_release_cmd android_release_file, GLOBALS.ANDROID_DEPLOY_APPBIN_PATH, GLOBALS.ANDROID_DEPLOY_APPBIN_URL
gulp.task "deploy:server:android", shell.task(cmd)
gulp.task "deploy:release:android", ["deploy:server:android"]


ios_deploy_release_tasks = []


ios_release_file = "platforms/ios/#{GLOBALS.BUNDLE_NAME}.ipa"
if GLOBALS.TESTFLIGHT_API_TOKEN
  gulp.task "deploy:testflight:ios", shell.task("curl http://testflightapp.com/api/builds.json \
    -F file=@#{ios_release_file} \
    -F api_token='#{GLOBALS.TESTFLIGHT_API_TOKEN}' \
    -F team_token='#{GLOBALS.TESTFLIGHT_TEAM_TOKEN}' \
    -F notes='This build was uploaded via the upload API' \
    -F notify=True \
    -F distribution_lists='Testers' \
  ")
  ios_deploy_release_tasks.push "deploy:testflight:ios"


if GLOBALS.IOS_DEPLOY_APPBIN_PATH
  cmd = deploy_release_cmd ios_release_file, GLOBALS.IOS_DEPLOY_APPBIN_PATH, GLOBALS.IOS_DEPLOY_APPBIN_URL
  gulp.task "deploy:server:ios", shell.task(cmd)
  ios_deploy_release_tasks.push "deploy:server:ios"


gulp.task "deploy:release:ios", ios_deploy_release_tasks


["ios", "android"].forEach (platform) ->
  # Build the release and deploys it to the HTTP server.
  gulp.task "release:#{platform}", (cb) ->
    runSequence "cordova:build-release:#{platform}", "cordova:sign-release:#{platform}", "deploy:release:#{platform}", cb


# Run set-debug as the first task, to enable debug version.
# Example: `gulp set-debug cordova:run:android`
gulp.task "set-debug", ->
  options.debug = true
  GLOBALS.BUNDLE_ID += ".debug"
  GLOBALS.BUNDLE_NAME += "Dbg"


gulp.task "build-debug", ["set-debug", "build"]


gulp.task "build", (cb) ->
  runSequence ["clean", "bower:install"],
    [
      "build:server"
      "assets"
      "styles"
      "scripts"
      "templates"
    ], cb


gulp.task "default", (cb) ->
  runSequence "build", ["watch", "server", "weinre", 'run:server', 'run:import'], cb


["cordova:platform-add", "cordova:emulate", "cordova:run", "cordova:run-release", "cordova:build-release", "deploy:release", "release"].forEach (task) ->
  if platform = GLOBALS.CORDOVA_PLATFORM
    gulp.task task, ["#{task}:#{platform}"]
  else
    gulp.task task, ->
      runSequence "#{task}:android", "#{task}:ios"
