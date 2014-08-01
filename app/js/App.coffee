# ==> Initialize angular's app.
# Include Dependencies
app = angular.module("app", [
  "ionic"
  # "ngCordova"
  "restangular"
  "ngAnimate"
  'ngGPlaces'
  'classy'
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
  RestangularProvider.setRestangularFields({
    route: "restangularRoute",
    selfLink: "self.href",
    # restangularCollection: true
  });
)


class @BaseCtrl
  # @register: (app, name) ->
  #   name ?= @name || @toString().match(/function\s*(.*?)\(/)?[1]
  #   app.controller name, @

  @inject: (args...) ->
    @$inject = args

  constructor: (args...) ->

    for key, index in @constructor.$inject
      @[key] = args[index]

    for key, fn of @constructor.prototype
      continue unless typeof fn is 'function'
      continue if key in ['constructor', 'initialize'] or key[0] is '_'
      @$scope[key] = fn.bind?(@) || _.bind(fn, @)

    @initialize?()






for k, v of GLOBALS
  app.constant k, v

# To debug, go to http://localhost:31173/client/#anonymous
if GLOBALS.WEINRE_ADDRESS && (ionic.Platform.isAndroid() || ionic.Platform.isIOS())
  addElement document, "script", id: "weinre-js", src: "http://#{GLOBALS.WEINRE_ADDRESS}/target/target-script-min.js#anonymous"
