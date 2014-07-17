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

    .state "tab.find",
      url: "/find"
      views:
        "tab-find":
          templateUrl: "js/modules/tabs/find/views/find.html"
          controller: "FindCtrl"

    .state "tab.find-item",
      url: '/find-item/:itemId'
      views:
        "tab-find":
          templateUrl: "js/modules/menu/item/item.html"
          controller: "ItemCtrl"

    .state "tab.nearby",
      url: "/nearby"
      views:
        "tab-nearby":
          templateUrl: "js/modules/tabs/nearby/views/nearby.html"
          controller: "NearbyCtrl"
    .state "tab.nearby-business",
      url: "/business/:businessId"
      views:
        "tab-nearby":
          templateUrl: "js/modules/menu/menu.html"
          controller: "MenuCtrl"
    .state "tab.review",
      url: "/review"
      views:
        "tab-review":
          templateUrl: "js/modules/tabs/review/views/review.html"
          controller: 'ReviewCtrl'

    # .state "tab.pet-detail",
    #   url: "/pet/:petId"
    #   views:
    #     "pets-tab":
    #       templateUrl: "templates/pet-detail.html"
    #       controller: "PetDetailCtrl"
    #
    # .state "tab.adopt",
    #   url: "/adopt"
    #   views:
    #     "adopt-tab":
    #       templateUrl: "templates/adopt.html"
    #
    # .state "tab.about",
    #   url: "/about"
    #   views:
    #     "about-tab":
    #       templateUrl: "templates/about.html"


    # .state 'tab.review-comment',
    #   url: 'reviews/comment'
    #   views:
    #     'tab-review':
    #       tempateUrl: 'js/components/tabs/review/views/comment.html'
    #       # controler: 'CommentCtrl'

    # if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise "/tab/find"
