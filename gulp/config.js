var gulp    = require('gulp');
var gutil   = require('gulp-util');


module.exports.APP_ROOT = APP_ROOT = require("execSync").exec("pwd").stdout.trim() + "/";

// # Used in "development" environment as a IP for the server.
// # You can specify it by using LOCAL_IP env variable in your cli commands.
module.exports.LOCAL_IP = LOCAL_IP = process.env.LOCAL_IP || require('execSync').exec("(ifconfig wlan 2>/dev/null || ifconfig en0) | grep inet | grep -v inet6 | awk '{print $2}' | sed 's/addr://g'").stdout.trim()

if(parseInt(LOCAL_IP) > 0){
  module.exports.LOCAL_IP = LOCAL_IP = "127.0.0.1";
}


module.exports.ENV_GLOBALS = ENV_GLOBALS = {
  development: {
    ENV: "development",

    BUNDLE_ID: "com.jtomaszewski.ionicstarter.development",
    BUNDLE_NAME: "Plateful",
    BUNDLE_VERSION: "1.0.0",

    BACKEND_URL: "http://#{LOCAL_IP}:9000",
    SECURE_BACKEND_URL: "http://#{LOCAL_IP}:9000",

    // # Automatically connect to weinre on application's startup
    // # (this way you can debug your application on your PC even if it's running from mobile ;) )
    WEINRE_ADDRESS: "#{LOCAL_IP}:31173",

    BUILD_DIR: "www",
    CORDOVA_PLATFORM: process.env.CORDOVA_PLATFORM || gulp.env.platform
  },

  production: {
    ENV: "production",

    BUNDLE_ID: "com.jtomaszewski.ionicstarter.production",
    BUNDLE_NAME: "Plateful",

    BACKEND_URL: "http://server4dave.cloudapp.net:9000",
    WEINRE_ADDRESS: null,

    // # If those 2 variables are defined, the app will be deployed to the remote server after compiling the release.
    ANDROID_DEPLOY_APPBIN_PATH: "deploy@ionicstarter.com:/u/apps/ionicstarter/shared/public/uploads/ionicstarter-production.apk",
    ANDROID_DEPLOY_APPBIN_URL: "http://ionicstarter.com/uploads/ionicstarter-production.apk",

    // # If those 2 variables are defined, the app will be deployed to the remote server after compiling the release.
    IOS_DEPLOY_APPBIN_PATH: "deploy@ionicstarter.com:/u/apps/ionicstarter/shared/public/uploads/ionicstarter-production.ipa",
    IOS_DEPLOY_APPBIN_URL: "http://ionicstarter.com/uploads/ionicstarter-production.ipa",

    // # Required for the release to be signed with correct certificate.
    IOS_PROVISIONING_PROFILE: "keys/ios/ionicstarterstaging.mobileprovision"

    // # GOOGLE_ANALYTICS_ID: "UA-123123-1"
    // # GOOGLE_ANALYTICS_HOST: "ionicstarter.com"

    // # If defined, we'll deploy the app to testflight after compiling the release.
    // # TESTFLIGHT_API_TOKEN: "123"
    // # TESTFLIGHT_TEAM_TOKEN: "456"
  }
};
module.exports.GLOBALS = GLOBALS = require('extend')( true), {}, ENV_GLOBALS.development, (ENV_GLOBALS[gutil.env.env] || {})

GLOBALS.CACHE_TAG = Date.now();

// # You can replace any of GLOBALS by defining ENV variable in your command line,
// # f.e. `BACKEND_URL="http://192.168.0.666:1337" gulp`
// for k, v of GLOBALS
  // GLOBALS[k] = process.env[k] if process.env[k]? && GLOBALS[k]?
for(var k in GLOBALS){
  if( process.env[k] && GLOBALS[k] ){
    GLOBALS[k] = process.env[k];
  }
}

// # In summary, GLOBALS are build in this way:
// # 1) Take the defaults (GLOBALS.development)
// # 2) Merge with current GLOBALS[env] (f.e. GLOBALS.staging)
// # 3) Replace existing GLOBALS with existing and matched ENV variables.

// # Only those will be actually passed into the frontend's application
// # (the rest of globals are used only during the compilation in gulp and shell scripts)
module.exports.PUBLIC_GLOBALS_KEYS = PUBLIC_GLOBALS_KEYS = [
  "ENV",
  "BACKEND_URL",
  "BUNDLE_NAME",
  "CACHE_TAG",
  "CORDOVA_GOOGLE_ANALYTICS_ID",
  "FB_APP_ID",
  "GOOGLE_ANALYTICS_HOST",
  "GOOGLE_ANALYTICS_ID",
  "WEINRE_ADDRESS"
];


module.exports.paths = paths = {
  assets: ['assets/**', '!assets/**/*.ejs'],
  assets_ejs: ['assets/**/*.ejs'],
  styles: ['app/css/**/*.scss', 'assets/components/fontawesome/scss/font-awesome.scss'],
  server: ['server/**/*.js'],
  import: ['import_server/**/*.coffee'],
  scripts: {
    vendor: [
      "assets/components/ionic/release/js/ionic.js",
      "assets/components/angular/angular.js",
      "assets/components/lodash/dist/lodash.js",
      "assets/components/angular-google-maps/dist/angular-google-maps.min.js",
      "assets/components/angular-animate/angular-animate.js",
      "assets/components/angular-sanitize/angular-sanitize.js",
      "assets/components/gsap/src/minified/TweenMax.min.js",
      "assets/components/ng-Fx/dist/ngFx.min.js",
      "assets/components/angular-ui-router/release/angular-ui-router.js",
      "assets/components/restangular/dist/restangular.js",
      "assets/components/ionic/release/js/ionic-angular.js",
      "assets/components/angularjs-google-places/dist/angularjs-google-places.min.js",
      "assets/components/angular-classy/angular-classy.min.js",
      "assets/components/angular-cache/dist/angular-cache.js",
      "assets/components/ion-google-place/ion-google-place.js",
      // # "assets/components/angularjs-google-places/src/angularjs-google-places.js",
      // # "assets/components/angularjs-google-places/src/google-api.js",
      // # Here add any vendor files that should be included in vendor.js
      // # (f.e. bower components)
    ],
    bootstrap: [
      'app/js/config/bootstrap.js'
    ],
    app: [
      'app/js/App.js', //# define application's angular module; add some native/global js variables,
      'app/js/*/**/*.js', // # include all angular submodules (like controllers, directives, services),
      'app/js/config/app_run.js' //# app.config; app.run
    ],
    tests: [
      'tests/**/*.coffee'
    ],
  },
  templates: ['app/**/*.jade']
}

module.exports.destinations = destinations = {
  assets: "#{GLOBALS.BUILD_DIR}",
  styles: "#{GLOBALS.BUILD_DIR}/css",
  scripts: "#{GLOBALS.BUILD_DIR}/js",
  templates: "#{GLOBALS.BUILD_DIR}",
  server: 'run',
  import: 'import',
  livereload: [
    'run/**',
    "#{GLOBALS.BUILD_DIR}/assets/**",
    "#{GLOBALS.BUILD_DIR}/css/**",
    "#{GLOBALS.BUILD_DIR}/fonts/**",
    "#{GLOBALS.BUILD_DIR}/img/**",
    "#{GLOBALS.BUILD_DIR}/js/**",
    "#{GLOBALS.BUILD_DIR}/templates/**",
    "#{GLOBALS.BUILD_DIR}/*.html",
  ]
};
module.exports.options = options = {
  open: gulp.env.open || process.env['OPEN'] || false, //# open the server in the browser on init?,
  httpPort: 4400,
  riddlePort: 4400
};
