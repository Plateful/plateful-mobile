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
    "app.modules",
    "app.factories",
    "app.directives",
    ]);

  app.config(function(RestangularProvider) {
    // RestangularProvider.setBaseUrl('http://server4dave.cloudapp.net:9000/api/v1/');
    RestangularProvider.setBaseUrl('http://localhost:9000/api/v1/');


    // RestangularProvider.setDefaultHttpFields({cache: true});
    RestangularProvider.setRequestSuffix('/');
    RestangularProvider.setRestangularFields({
      cache: true,
      id: '_id',
      route: "restangularRoute",
      selfLink: "self.href"
    });
  });

  // this.BaseCtrl = (function() {
  //   BaseCtrl.inject = function() {
  //     var args;
  //     args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  //     return this.$inject = args;
  //   };
  //
  //   function BaseCtrl() {
  //     var args, fn, index, key, _i, _len, _ref, _ref1;
  //     args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  //     _ref = this.constructor.$inject;
  //     for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
  //       key = _ref[index];
  //       this[key] = args[index];
  //     }
  //     _ref1 = this.constructor.prototype;
  //     for (key in _ref1) {
  //       fn = _ref1[key];
  //       if (typeof fn !== 'function') {
  //         continue;
  //       }
  //       if ((key === 'constructor' || key === 'initialize') || key[0] === '_') {
  //         continue;
  //       }
  //       this.$scope[key] = (typeof fn.bind === "function" ? fn.bind(this) : void 0) || _.bind(fn, this);
  //     }
  //     if (typeof this.initialize === "function") {
  //       this.initialize();
  //     }
  //   }
  //
  //   return BaseCtrl;
  //
  // })();

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
