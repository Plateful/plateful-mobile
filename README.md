# Features
For more detailed information please visit the project [wiki page](https://github.com/Clurtchio/clurtch/wiki).

* Application can be run in a local http server, or emulated/released to Android/iOS
* A lot of useful gulp tasks, like:
  * `gulp` - watch for changes + livereload + http server + weinre debugger
  * `gulp cordova:emulate:ios` - run application in iOS emulator
  * `gulp cordova:run:android` - run application on Android's devise
* Useful hooks and tweaks, which allow you to deploy your cordova app out-of-the-box
* SASS + CoffeeScript + Jade combo
* Support for multiple environments, like *development, staging, production* (configuration available in `gulpfile.coffee`)
* Tests configured and working: unit (karma + mocha) and end to end (protractor)

# Requirements

* NodeJS
* Cordova 3.5+
* Android or iOS SDK installed and [configured](http://docs.phonegap.com/en/3.3.0/guide_platforms_index.md.html#Platform%20Guides) (required only if you want to deploy the app to native mobile platforms - you can run `gulp` server without that)


# How to install

```
git clone https://github.com/Clurtchio/clurtch.git
cd clurtch

# install dependencies
npm install # or sudo npm install if you need permission to make system changes
npm install -g gulp
bower install
brew install imagemagick # or `apt-get install imagemagick`, if you're on linux
brew install neo4j # see wiki for more info on setting up Neo4j
neo4j start

gulp # build www/ directory and run http server on 4440 port
```


Also install the required cordova plugins (make sure to run gulp before adding these plugins)

```
cordova plugin add org.apache.cordova.camera
cordova plugin add org.apache.cordova.device
cordova plugin add org.apache.cordova.file
cordova plugin add org.apache.cordova.file-transfer
cordova plugin add org.apache.cordova.geolocation
cordova plugin add org.transistorsoft.cordova.background-geolocation

```

If you get "too many files" error, try: `ulimit -n 10000`. You may want to add this line to your .bashrc / .zshrc / config.fish.


## What does the `gulp build` do?

More or less:

* All .scss, .coffee, .jade files from `app/` will be compiled and copied to `www/`
* All `.ejs` files from `assets/` will be compiled to `www/`.
* All other files from `assets/` will be copied to `www/`.

For detailed description, see `gulpfile.coffee`.

P.S. `www/` is like `dist/` directory for Cordova. That's why it's not included in this repository, as it's fully generated with `gulp`.


## Testing

Requirements: installed PhantomJS and configured [selenium standalone webdriver](https://github.com/angular/protractor/blob/master/docs/getting-started.md#setup-and-config).

#### Unit tests (karma & PhantomJS/Chrome)

```
gulp test:unit # using PhantomJS
gulp test:unit --browsers Chrome # or using Google Chrome
```

#### e2e tests (protractor & selenium)

```
cd ../rails && bin/rails s # make sure your rails server is running in the background
gulp # your www/ directory should be built and served at :4400 port
node_modules/.bin/webdriver-manager start & # run selenium server in the background

gulp test:e2e # finally, run e2e tests
```


# How to run on mobile?

I recommend [tmux](http://tmux.sourceforge.net/) for handling multiple terminal tabs/windows ;)

1. Copy `.envrc.android-sample` or `.envrc.ios-sample` to `.envrc` and configure it.

  * Ofcourse, if you're a Mac user and you can compile both Android and iOS on the same machine, you can include all the variables from both of these files in only one `.envrc` .

  * Also, make sure you have all the keys and certificates needed stored in `keys/android/` and `keys/ios/`:

    * `keys/android/ionicstarter.keystore`
    * `keys/ios/ionicstarter_staging.mobileprovision`
    * `keys/ios/ionicstarter_production.mobileprovision`

2. Ensure, you have [configured ios/android platform with Cordova](http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html), f.e. by running `gulp cordova:platform-add:[ios|android]`.

3. Run `gulp cordova:emulate:[ios|android]` or `gulp cordova:run:[ios|android]`.

# Releasing to appstores

First, generate the certificate keys:

#### Android

1. [Generate .keystore file](http://developer.android.com/tools/publishing/app-signing.html):
`keytool -genkey -v -keystore keys/android/$ANDROID_KEYSTORE_NAME.keystore -alias $ANDROID_ALIAS_NAME -keyalg RSA -keysize 2048 -validity 10000`

2. Add proper key hash to [Facebook application](https://developers.facebook.com/x/apps/) in android's settings.

  You can generate Key Hash using [this method](https://developers.facebook.com/docs/android/getting-started/):
  `keytool -exportcert -alias $ANDROID_ALIAS_NAME -keystore keys/android/$ANDROID_KEYSTORE_NAME.keystore | openssl sha1 -binary | openssl base64`

  To generate debug's Key Hash (using in `cordova run`), use:
  `keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore -storepass android | openssl sha1 -binary | openssl base64`

#### iPhone

1. Create a certificate and a provisioning profile, as it's described [here](http://docs.build.phonegap.com/en_US/3.3.0/signing_signing-ios.md.html#iOS%20Signing).

2. Download the provisioning profile and copy it into `keys/ios/`, so it will match the `IOS_PROVISIONING_PROFILE` file set up in the `gulpfile.coffee`.

Then, generate the application and deploy it to the webserver with:

```
gulp release --env=[staging|production]
```
