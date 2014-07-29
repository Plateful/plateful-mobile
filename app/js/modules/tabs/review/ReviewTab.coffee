angular.module('app.modules.tabs.review', [
  'app.modules.tabs.review.controllers'
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
          controller: 'ReviewItemCtrl'

    .state "tab.review-create-item",
      url: '/review/create-item'
      views:
        "tab-review":
          templateUrl: 'js/modules/tabs/review/views/create-item.html'
          controller: 'createItemCtrl'

    .state "tab.review-create",
      url: '/review/create/:itemId'
      views:
        "tab-review":
          templateUrl: 'js/modules/tabs/review/views/create.html'
          controller: 'createReviewCtrl'
