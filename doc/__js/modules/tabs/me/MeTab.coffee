angular.module('app.modules.tabs.me', [])


.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
    .state "tab.list",
      url: "/list"
      views:
        'tabs-list':
          templateUrl: "js/modules/tabs/me/views/me.html"
