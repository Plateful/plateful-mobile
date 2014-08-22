(function() {
  var app, k, v,
    __slice = [].slice;

  app = angular.module("app", [
    "ionic",
    "restangular",
    "ngAnimate",
    'ngGPlaces',
    'classy',
    "fx.animations",
    "google-maps",
    "ion-google-place",
    "app.services",
    "app.directives",
    "app.filters",
    "app.models",
    "app.tabs",
    "app.states"
    ]);

  app.config(function(RestangularProvider) {


    RestangularProvider.setBaseUrl('http://server4dave.cloudapp.net:9000/api/v1/');
    // RestangularProvider.setBaseUrl('http://10.8.29.210:9000/api/v1/');
    // RestangularProvider.setBaseUrl('http://localhost:9000/api/v1/');



    RestangularProvider.setRequestSuffix('/');
    RestangularProvider.setRestangularFields({
      cache: true,
      id: '_id',
      route: "restangularRoute",
      selfLink: "self.href"
    });
  });

  for (k in GLOBALS) {
    v = GLOBALS[k];
    app.constant(k, v);
  }

  if (GLOBALS.WEINRE_ADDRESS && (ionic.Platform.isAndroid() || ionic.Platform.isIOS())) {
    addElement(document, "script", {
      id: "weinre-js",
      src: "http://" + GLOBALS.WEINRE_ADDRESS + "/target/target-script-min.js#anonymous"
    });
  }

}).call(this);
