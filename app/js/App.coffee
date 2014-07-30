# ==> Initialize angular's app.
# Include Dependencies
app = angular.module("app", [
  "ionic"
  # "ngCordova"
  "restangular"
  "ngAnimate"
  'ngGPlaces'  
  "fx.animations"
  "google-maps"
  "ion-google-place"
  "app.modules"
  "app.factories"
  "app.directives"

])
# Set restangular's base URL
app.config( (RestangularProvider)->
  RestangularProvider.setBaseUrl('http://localhost:9000/api/v1/')
  RestangularProvider.setRequestSuffix('/')
)

for k, v of GLOBALS
  app.constant k, v

# To debug, go to http://localhost:31173/client/#anonymous
if GLOBALS.WEINRE_ADDRESS && (ionic.Platform.isAndroid() || ionic.Platform.isIOS())
  addElement document, "script", id: "weinre-js", src: "http://#{GLOBALS.WEINRE_ADDRESS}/target/target-script-min.js#anonymous"
