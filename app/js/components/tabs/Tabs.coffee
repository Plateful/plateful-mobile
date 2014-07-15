angular.module('clurtch.components.tabs', [
  'clurtch.components.tabs.find'
  'clurtch.components.tabs.review'
  'clurtch.components.tabs.nearby'
  # 'clurtch.components.tabs.share'
  # 'clurtch.components.tabs.notify'
  # 'clurtch.components.tabs.settings'
  ])
.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
    .state "tab",
      url: "/tab"
      abstract: true
      templateUrl: "js/components/tabs/tabs.html"

    .state "tab.find",
      url: "/find"
      views:
        "tab-find":
          templateUrl: "js/components/tabs/find/views/find.html"
          controller: "FindCtrl"

    .state "tab.review",
      url: "/review"
      views:
        "tab-review":
          templateUrl: "js/components/tabs/review/views/review.html"
          # controller: 'ReviewCtrl'
    .state "tab.nearby",
      url: "/nearby"
      views:
        "tab-nearby":
          templateUrl: "js/components/tabs/nearby/views/nearby.html"
          controller: "NearbyCtrl"

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
