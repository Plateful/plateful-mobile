angular.module('clurtch.modules.tabs', [
  'clurtch.modules.tabs.find'
  'clurtch.modules.tabs.review'
  'clurtch.modules.tabs.nearby'
  # 'clurtch.components.tabs.share'
  # 'clurtch.components.tabs.notify'
  # 'clurtch.components.tabs.settings'
  ])
.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
    .state "tab",
      url: "/tab"
      abstract: true
      templateUrl: "js/modules/tabs/tabs.html"

    .state "tab.review",
      url: "/review"
      views:
        "tab-review":
          templateUrl: "js/modules/tabs/review/views/review.html"
          controller: 'ReviewCtrl'
      
    # if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise "/tab/find"
