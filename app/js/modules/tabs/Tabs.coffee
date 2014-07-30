angular.module('app.modules.tabs', [
  'app.modules.tabs.items'
  'app.modules.tabs.review'
  'app.modules.tabs.menus'
  'app.modules.tabs.settings'
  # 'app.components.tabs.share'
  # 'app.components.tabs.notify'
  ])
.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
    .state "tab",
      url: "/tab"
      abstract: true
      templateUrl: "js/modules/tabs/tabs.html"
    

    # if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise "/tab/items"
