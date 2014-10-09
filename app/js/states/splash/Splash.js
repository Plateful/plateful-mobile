(function() {
  angular.module('app.states.splash', [])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state("splash", {
        url: "/",
        templateUrl: "js/states/splash/splash.html"
      });
    });

}).call(this);
