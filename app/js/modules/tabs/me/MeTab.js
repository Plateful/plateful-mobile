(function() {
  angular.module('app.modules.tabs.me', []).config(function($stateProvider, $urlRouterProvider) {
    return $stateProvider.state("tab.list", {
      url: "/list",
      views: {
        'tabs-list': {
          templateUrl: "js/modules/tabs/me/views/me.html"
        }
      }
    });
  });

}).call(this);
