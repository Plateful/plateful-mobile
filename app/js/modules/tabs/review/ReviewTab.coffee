angular.module('clurtch.modules.tabs.review', [
  'clurtch.modules.tabs.review.controllers'
])
  # 'clurtch.components.tabs.share.services'
  # 'clurtch.components.tabs.share.directives'


.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
    .state "tab.review",
      url: "/review"
      views:
        "tab-review":
          templateUrl: "js/modules/tabs/review/views/review.html"
          controller: 'ReviewCtrl'
    .state "tab.review-choose-item",
      url: '/review/choose-item/:businessId'
      views:
        "tab-review":
          templateUrl: 'js/modules/tabs/review/views/chooseItem.html'
