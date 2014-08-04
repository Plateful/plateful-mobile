(function() {
  angular.module('app.modules.tabs', ['app.modules.tabs.items', 'app.modules.tabs.review', 'app.modules.tabs.menus', 'app.modules.tabs.settings']).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("tab", {
      url: "/tab",
      abstract: true,
      templateUrl: "js/modules/tabs/tabs.html"
    });
  });

}).call(this);
