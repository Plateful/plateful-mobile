(function() {
  angular
    .module('app.modules.tabs.list', [])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state("tab.list", {
        url: "/list",
        views: {
          'tabs-list': {
            templateUrl: "js/modules/tabs/list/views/list.html"
          }
        }
      });
    });
}).call(this);
