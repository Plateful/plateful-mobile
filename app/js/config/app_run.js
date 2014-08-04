(function() {
  var app;

  app = angular.module("app");

  app.constant('ServerUrl', 'http://localhost:9000/');

  ionic.Platform.ready(function() {
    app.config(function($provide, $httpProvider) {
      var _base;
      (_base = $httpProvider.defaults.headers).patch || (_base.patch = {});
      $httpProvider.defaults.headers.patch['Content-Type'] = 'application/json';
      return $httpProvider.interceptors.push(function($injector, $q) {
        return {
          responseError: function(response) {
            if (GLOBALS.ENV !== "test") {
              console.log("httperror: ", response.status);
            }
            if (response.status === 401) {
              $injector.invoke(function(Auth) {
                return Auth.setAuthToken(null);
              });
            }
            return $q.reject(response);
          }
        };
      });
    });
    return angular.bootstrap(document, ['app']);
  });

  app.run(function($rootScope, Auth, $window, $timeout, bGeo) {
    $rootScope.currentLocation = window.backgroundGeoLocation;
    $rootScope.$apply();
    $rootScope.GLOBALS = GLOBALS;
    $timeout(function() {
      var _ref;
      return $window.$a = (_ref = angular.element(document.body).injector()) != null ? _ref.get : void 0;
    });
    $rootScope.$watch((function() {
      var _ref;
      return (_ref = Auth.user) != null ? _ref.id : void 0;
    }), function() {
      return $rootScope.current_user = Auth.user;
    });
    return $timeout(function() {
      var _ref;
      return (_ref = navigator.splashscreen) != null ? _ref.hide() : void 0;
    });
  });

}).call(this);
