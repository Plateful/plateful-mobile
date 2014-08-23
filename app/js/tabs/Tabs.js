(function() {
  angular.module('app.tabs', [
    'app.tabs.items',
    'app.tabs.menus',
    'app.tabs.review',
    'app.tabs.list',
    'app.tabs.settings'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("tab", {
      url: "/tab",
      abstract: true,
      templateUrl: "js/tabs/tabs.html"
    });

    // $urlRouterProvider.otherwise('/tab/items');
  });

}).call(this);
