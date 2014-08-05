// require('coffee-script/register');
// require('./gulpfile.coffee');
var APP_ROOT, ENV_GLOBALS, GLOBALS, LOCAL_IP, PUBLIC_GLOBALS_KEYS, Q, android_release_file, cache, changed, child_process, clean, cmd, coffee, concat, connect, deploy_release_cmd, destinations, ecstatic, ejs, gulp, gutil, http, ios_deploy_release_tasks, ios_release_file, jade, k, livereload, nodemon, notify, open, open_qrcode_cmd, options, path, paths, phantomChild, phantomDefer, protractor, ripple, runSequence, sass, shell, v;

Q = require('q');

child_process = require('child_process');

connect = require('gulp-connect');

gulp = require('gulp');

gutil = require('gulp-util');

sass = require('gulp-sass');

coffee = require('gulp-coffee');

jade = require('gulp-jade');

livereload = require('gulp-livereload');

changed = require('gulp-changed');

ripple = require('ripple-emulator');

open = require('open');

http = require('http');

path = require('path');

ecstatic = require('ecstatic');

notify = require('gulp-notify');

concat = require('gulp-concat');

clean = require('gulp-clean');

cache = require('gulp-cache');

ejs = require('gulp-ejs');

shell = require('gulp-shell');

protractor = require('gulp-protractor');

runSequence = require('run-sequence');

nodemon = require('gulp-nodemon');

APP_ROOT = require("execSync").exec("pwd").stdout.trim() + "/";

LOCAL_IP = process.env.LOCAL_IP || require('execSync').exec("(ifconfig wlan 2>/dev/null || ifconfig en0) | grep inet | grep -v inet6 | awk '{print $2}' | sed 's/addr://g'").stdout.trim();

if (!(parseInt(LOCAL_IP) > 0)) {
  LOCAL_IP = "127.0.0.1";
}

ENV_GLOBALS = {
  development: {
    ENV: "development",
    BUNDLE_ID: "com.jtomaszewski.ionicstarter.development",
    BUNDLE_NAME: "clurtch",
    BUNDLE_VERSION: "1.0.0",
    BACKEND_URL: "http://" + LOCAL_IP + ":9000",
    SECURE_BACKEND_URL: "http://" + LOCAL_IP + ":9000",
    WEINRE_ADDRESS: "" + LOCAL_IP + ":31173",
    BUILD_DIR: "www",
    CORDOVA_PLATFORM: process.env.CORDOVA_PLATFORM || gulp.env.platform
  },
  production: {
    ENV: "production",
    BUNDLE_ID: "com.jtomaszewski.ionicstarter.production",
    BUNDLE_NAME: "clurtch",
    BACKEND_URL: "https://clurtch-v1.azurewebsites.net",
    WEINRE_ADDRESS: null,
    ANDROID_DEPLOY_APPBIN_PATH: "deploy@ionicstarter.com:/u/apps/ionicstarter/shared/public/uploads/ionicstarter-production.apk",
    ANDROID_DEPLOY_APPBIN_URL: "http://ionicstarter.com/uploads/ionicstarter-production.apk",
    IOS_DEPLOY_APPBIN_PATH: "deploy@ionicstarter.com:/u/apps/ionicstarter/shared/public/uploads/ionicstarter-production.ipa",
    IOS_DEPLOY_APPBIN_URL: "http://ionicstarter.com/uploads/ionicstarter-production.ipa",
    IOS_PROVISIONING_PROFILE: "keys/ios/ionicstarterstaging.mobileprovision"
  }
};

GLOBALS = require('extend')(true, {}, ENV_GLOBALS.development, ENV_GLOBALS[gutil.env.env] || {});

GLOBALS.CACHE_TAG = Date.now();

for (k in GLOBALS) {
  v = GLOBALS[k];
  if ((process.env[k] != null) && (GLOBALS[k] != null)) {
    GLOBALS[k] = process.env[k];
  }
}

PUBLIC_GLOBALS_KEYS = ["ENV", "BACKEND_URL", "BUNDLE_NAME", "CACHE_TAG", "CORDOVA_GOOGLE_ANALYTICS_ID", "FB_APP_ID", "GOOGLE_ANALYTICS_HOST", "GOOGLE_ANALYTICS_ID", "WEINRE_ADDRESS"];

paths = {
  assets: ['assets/**', '!assets/**/*.ejs'],
  assets_ejs: ['assets/**/*.ejs'],
  styles: ['app/css/**/*.scss'],
  server: ['server_coffee/**/*.coffee'],
  "import": ['import_server/**/*.coffee'],
  scripts: {
    vendor: ["assets/components/ionic/release/js/ionic.js", "assets/components/angular/angular.js", "assets/components/lodash/dist/lodash.js", "assets/components/angular-google-maps/dist/angular-google-maps.min.js", "assets/components/angular-animate/angular-animate.js", "assets/components/angular-sanitize/angular-sanitize.js", "assets/components/gsap/src/minified/TweenMax.min.js", "assets/components/ng-Fx/dist/ngFx.min.js", "assets/components/angular-ui-router/release/angular-ui-router.js", "assets/components/restangular/dist/restangular.js", "assets/components/ionic/release/js/ionic-angular.js", "assets/components/angularjs-google-places/dist/angularjs-google-places.min.js", "assets/components/angular-classy/angular-classy.min.js", "assets/components/ion-google-place/ion-google-place.js"],
    bootstrap: ['app/js/config/bootstrap.coffee'],
    app: ['app/js/App.coffee', 'app/js/*/**/*.coffee', 'app/js/config/app_run.coffee'],
    tests: ['tests/**/*.coffee']
  },
  templates: ['app/**/*.jade']
};

destinations = {
  assets: "" + GLOBALS.BUILD_DIR,
  styles: "" + GLOBALS.BUILD_DIR + "/css",
  scripts: "" + GLOBALS.BUILD_DIR + "/js",
  templates: "" + GLOBALS.BUILD_DIR,
  server: 'run',
  "import": 'import',
  livereload: ['run/**', "" + GLOBALS.BUILD_DIR + "/assets/**", "" + GLOBALS.BUILD_DIR + "/css/**", "" + GLOBALS.BUILD_DIR + "/fonts/**", "" + GLOBALS.BUILD_DIR + "/img/**", "" + GLOBALS.BUILD_DIR + "/js/**", "" + GLOBALS.BUILD_DIR + "/templates/**", "" + GLOBALS.BUILD_DIR + "/*.html"]
};

options = {
  open: gulp.env.open || process.env['OPEN'] || false,
  httpPort: 4400,
  riddlePort: 4400
};

gulp.task('clean', function() {
  gulp.src(GLOBALS.BUILD_DIR, {
    read: false
  }).pipe(clean({
    force: true
  }));
  gulp.src('run', {
    read: false
  }).pipe(clean({
    force: true
  }));
  return gulp.src('import', {
    read: false
  }).pipe(clean({
    force: true
  }));
});

gulp.task('bower:install', shell.task('bower install'));

gulp.task('assets:ejs', function() {
  return gulp.src(paths.assets_ejs).pipe(ejs(GLOBALS, {
    ext: ''
  })).pipe(gulp.dest(destinations.assets));
});

gulp.task('assets:others', function() {
  return gulp.src(paths.assets).pipe(changed(destinations.assets)).pipe(gulp.dest(destinations.assets));
});

gulp.task('assets', ['assets:ejs', 'assets:others']);

gulp.task('styles', function() {
  return gulp.src(paths.styles).pipe(changed(destinations.styles, {
    extension: '.css'
  })).pipe(sass({})).on('error', notify.onError(function(error) {
    return error.message;
  })).pipe(gulp.dest(destinations.styles));
});

gulp.task('scripts:vendor', function() {
  return gulp.src(paths.scripts.vendor).pipe(concat('vendor.js')).pipe(gulp.dest(destinations.scripts));
});

['app', 'bootstrap'].forEach(function(scriptsName) {
  return gulp.task("scripts:" + scriptsName, function() {
    return gulp.src(paths.scripts[scriptsName]).pipe(coffee({
      sourceMap: false
    })).on("error", notify.onError(function(error) {
      return error.message;
    })).pipe(concat("" + scriptsName + ".js")).pipe(gulp.dest(destinations.scripts));
  });
});

gulp.task('compile:server', function() {
  return gulp.src(paths.server).pipe(coffee({
    sourceMap: false
  })).on("error", notify.onError(function(error) {
    return error.message;
  })).pipe(gulp.dest(destinations.server));
});

gulp.task('compile:import', function() {
  return gulp.src(paths["import"]).pipe(coffee({
    sourceMap: false
  })).on("error", notify.onError(function(error) {
    return error.message;
  })).pipe(gulp.dest(destinations["import"]));
});

gulp.task('run:import', function() {});

gulp.task('run:server', function() {
  return nodemon({
    script: "run/app.js",
    ext: 'html js',
    ignore: ['ignored.js']
  }).on('restart', function() {
    return console.log('restarted!');
  });
});

gulp.task('build:server', ['compile:server', 'compile:import']);

gulp.task("scripts:cordova", function() {
  return gulp.src("assets/components/cordova/ng-cordova.js").pipe(gulp.dest(destinations.scripts));
});

gulp.task('scripts', ['scripts:vendor', 'scripts:app', 'scripts:bootstrap', 'scripts:cordova']);

gulp.task('templates', function() {
  var key, template_globals, _i, _len;
  template_globals = {};
  for (_i = 0, _len = PUBLIC_GLOBALS_KEYS.length; _i < _len; _i++) {
    key = PUBLIC_GLOBALS_KEYS[_i];
    if (GLOBALS[key]) {
      template_globals[key] = GLOBALS[key];
    }
  }
  return gulp.src(paths.templates).pipe(changed(destinations.templates, {
    extension: '.html'
  })).pipe(jade({
    locals: {
      GLOBALS: template_globals
    },
    pretty: true
  })).on('error', notify.onError(function(error) {
    return error.message;
  })).pipe(gulp.dest(destinations.templates));
});

phantomChild = null;

phantomDefer = null;

gulp.task('test:e2e:server', function(cb) {
  if (phantomDefer) {
    return cb();
  }
  phantomDefer = Q.defer();
  phantomChild = child_process.spawn('phantomjs', ['--webdriver=4444'], {});
  phantomChild.stdout.on('data', function(data) {
    gutil.log(gutil.colors.yellow(data.toString()));
    if (data.toString().match('running on port ')) {
      return phantomDefer.resolve();
    }
  });
  phantomChild.once('close', function() {
    gutil.log("phantomChild closed");
    if (phantomChild) {
      phantomChild.kill();
    }
    return phantomDefer.reject();
  });
  phantomChild.on('exit', function(code) {
    gutil.log("phantomChild exitted");
    if (phantomChild) {
      return phantomChild.kill();
    }
  });
  return phantomDefer.promise;
});

gulp.task('test:e2e:prepare', function(cb) {
  return child_process.exec("rake test:seed RAILS_ENV=development", {
    cwd: "../rails"
  }, function(error, stdout, stderr) {
    return cb(error);
  });
});

gulp.task('test:e2e', ['test:e2e:prepare'], function() {
  var args, protractorTests;
  args = ['--baseUrl', "http://localhost:" + options.httpPort];
  if (gulp.env.debug) {
    args.push('debug');
  }
  protractorTests = paths.scripts.tests;
  if (gulp.env.specs) {
    protractorTests = gulp.env.specs.split(',');
  }
  return gulp.src(protractorTests).pipe(protractor.protractor({
    configFile: "tests/protractor.config.js",
    args: args
  })).on('error', notify.onError(function(error) {
    return error.message;
  }));
});

gulp.task('test:unit', function() {
  var args, name, _i, _len, _ref;
  args = ['start', 'test/unit/karma.conf.coffee'];
  _ref = ['browsers', 'reporters'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    name = _ref[_i];
    if (gulp.env.hasOwnProperty(name)) {
      args.push("--" + name, "" + gulp.env[name]);
    }
  }
  return child_process.spawn("node_modules/.bin/karma", args, {
    stdio: 'inherit'
  });
});

gulp.task('watch', function() {
  var livereloadServer;
  if (process.env.GULP_WATCH_ASSETS) {
    gulp.watch(paths.assets, ['assets']);
  }
  gulp.watch(paths.assets_ejs, ['assets_ejs']);
  gulp.watch(paths.scripts.app, ['scripts:app']);
  gulp.watch(paths.scripts.bootstrap, ['scripts:bootstrap']);
  gulp.watch(paths.scripts.vendor, ['scripts:vendor']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.server, ['compile:server']);
  livereloadServer = livereload();
  return gulp.watch(destinations.livereload).on('change', function(file) {
    return livereloadServer.changed(file.path);
  });
});

gulp.task('emulator', function() {
  var url;
  ripple.emulate.start(options);
  gutil.log(gutil.colors.blue("Ripple-Emulator listening on " + options.ripplePort));
  if (options.open) {
    url = "http://localhost:" + options.ripplePort + "/?enableripple=cordova-3.0.0-HVGA";
    open(url);
    return gutil.log(gutil.colors.blue("Opening " + url + " in the browser..."));
  }
});

gulp.task('server', function() {
  var url;
  http.createServer(ecstatic({
    root: GLOBALS.BUILD_DIR
  })).listen(options.httpPort);
  gutil.log(gutil.colors.blue("HTTP server listening on " + options.httpPort));
  if (options.open) {
    url = "http://localhost:" + options.httpPort + "/";
    open(url);
    return gutil.log(gutil.colors.blue("Opening " + url + " in the browser..."));
  }
});

gulp.task("weinre", function() {
  var args, child, weinreHost, weinrePort, _ref;
  _ref = GLOBALS.WEINRE_ADDRESS.split(":"), weinreHost = _ref[0], weinrePort = _ref[1];
  args = ["--httpPort=" + weinrePort, "--boundHost=" + weinreHost];
  child = child_process.spawn("node_modules/.bin/weinre", args, {
    stdio: "inherit"
  });
  if (options.open) {
    open("http://" + weinreHost + ":" + weinrePort + "/client/#anonymous");
    return gutil.log(gutil.colors.blue("Opening weinre debugger in the browser..."));
  }
});

gulp.task("cordova:clear", shell.task('rm -rf plugins/* platforms/*'));

["ios", "android"].forEach(function(platform) {
  gulp.task("cordova:platform-add:" + platform, ['build'], shell.task("env BUNDLE_ID=\"" + GLOBALS.BUNDLE_ID + "\" FB_APP_ID=\"" + GLOBALS.FB_APP_ID + "\" FB_APP_NAME=\"" + GLOBALS.FB_APP_NAME + "\" node_modules/.bin/cordova platform add " + platform, {
    ignoreErrors: true
  }));
  gulp.task("cordova:emulate:" + platform, ["cordova:platform-add:" + platform, "build-debug"], shell.task("env BUNDLE_VERSION=\"" + GLOBALS.BUNDLE_VERSION + "\" BUNDLE_NAME=\"" + GLOBALS.BUNDLE_NAME + "\" node_modules/.bin/cordova emulate " + platform));
  gulp.task("cordova:run:" + platform, ["cordova:platform-add:" + platform, "build-debug"], shell.task("env BUNDLE_VERSION=\"" + GLOBALS.BUNDLE_VERSION + "\" BUNDLE_NAME=\"" + GLOBALS.BUNDLE_NAME + "\" node_modules/.bin/cordova run " + platform + " --device"));
  gulp.task("cordova:run-release:" + platform, ["cordova:platform-add:" + platform, "build"], shell.task("env BUNDLE_VERSION=\"" + GLOBALS.BUNDLE_VERSION + "\" BUNDLE_NAME=\"" + GLOBALS.BUNDLE_NAME + "\" node_modules/.bin/cordova run " + platform + " --device --release"));
  return gulp.task("cordova:build-release:" + platform, ["cordova:platform-add:" + platform, "build"], shell.task("env BUNDLE_VERSION=\"" + GLOBALS.BUNDLE_VERSION + "\" BUNDLE_NAME=\"" + GLOBALS.BUNDLE_NAME + "\" node_modules/.bin/cordova build " + platform + " --release --device"));
});

gulp.task("cordova:sign-release:android", []);

gulp.task("cordova:sign-release:ios", shell.task("xcrun -sdk iphoneos PackageApplication -v platforms/ios/build/device/" + GLOBALS.BUNDLE_NAME + ".app -o " + APP_ROOT + "platforms/ios/" + GLOBALS.BUNDLE_NAME + ".ipa --sign \"" + process.env.IOS_SIGN_KEY + "\" --embed " + GLOBALS.IOS_PROVISIONING_PROFILE));

open_qrcode_cmd = function(url) {
  return "curl -s --include --request GET 'https://pierre2106j-qrcode.p.mashape.com/api?type=text&text=" + (encodeURIComponent(url)) + "&ecl=L%20%7C%20M%7C%20Q%20%7C%20H&pixel=8&forecolor=000000&backcolor=ffffff' --header \"X-Mashape-Authorization: xWzeUXHELgVCXp9L4iK3epFzvsTECUai\" | tail -n 1 | xargs open";
};

deploy_release_cmd = function(from, to, to_url) {
  return ("scp " + from + " " + to + " && echo \"App has been deployed to " + to_url + " .\"") + (options.open ? " && " + (open_qrcode_cmd(to_url)) : "");
};

android_release_file = "platforms/android/ant-build/" + GLOBALS.BUNDLE_NAME + "-release.apk";

cmd = deploy_release_cmd(android_release_file, GLOBALS.ANDROID_DEPLOY_APPBIN_PATH, GLOBALS.ANDROID_DEPLOY_APPBIN_URL);

gulp.task("deploy:server:android", shell.task(cmd));

gulp.task("deploy:release:android", ["deploy:server:android"]);

ios_deploy_release_tasks = [];

ios_release_file = "platforms/ios/" + GLOBALS.BUNDLE_NAME + ".ipa";

if (GLOBALS.TESTFLIGHT_API_TOKEN) {
  gulp.task("deploy:testflight:ios", shell.task("curl http://testflightapp.com/api/builds.json -F file=@" + ios_release_file + " -F api_token='" + GLOBALS.TESTFLIGHT_API_TOKEN + "' -F team_token='" + GLOBALS.TESTFLIGHT_TEAM_TOKEN + "' -F notes='This build was uploaded via the upload API' -F notify=True -F distribution_lists='Testers' "));
  ios_deploy_release_tasks.push("deploy:testflight:ios");
}

if (GLOBALS.IOS_DEPLOY_APPBIN_PATH) {
  cmd = deploy_release_cmd(ios_release_file, GLOBALS.IOS_DEPLOY_APPBIN_PATH, GLOBALS.IOS_DEPLOY_APPBIN_URL);
  gulp.task("deploy:server:ios", shell.task(cmd));
  ios_deploy_release_tasks.push("deploy:server:ios");
}

gulp.task("deploy:release:ios", ios_deploy_release_tasks);

["ios", "android"].forEach(function(platform) {
  return gulp.task("release:" + platform, function(cb) {
    return runSequence("cordova:build-release:" + platform, "cordova:sign-release:" + platform, "deploy:release:" + platform, cb);
  });
});

gulp.task("set-debug", function() {
  options.debug = true;
  GLOBALS.BUNDLE_ID += ".debug";
  return GLOBALS.BUNDLE_NAME += "Dbg";
});

gulp.task("build-debug", ["set-debug", "build"]);

gulp.task("build", function(cb) {
  return runSequence(["clean", "bower:install"], ["build:server", "assets", "styles", "scripts", "templates"], cb);
});

gulp.task("default", function(cb) {
  return runSequence("build", ["watch", "server", "weinre", 'run:server', 'run:import'], cb);
});

["cordova:platform-add", "cordova:emulate", "cordova:run", "cordova:run-release", "cordova:build-release", "deploy:release", "release"].forEach(function(task) {
  var platform;
  if (platform = GLOBALS.CORDOVA_PLATFORM) {
    return gulp.task(task, ["" + task + ":" + platform]);
  } else {
    return gulp.task(task, function() {
      return runSequence("" + task + ":android", "" + task + ":ios");
    });
  }
});

