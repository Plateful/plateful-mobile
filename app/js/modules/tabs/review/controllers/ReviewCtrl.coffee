angular.module('clurtch.modules.tabs.review.controllers', [])

.service 'CreateReview', ()->
  review = {}

  get: (key)->
    if key then return review[key]
    review
  set: (key, val)->
    review[key] = val

.controller 'ReviewCtrl', [
  '$scope'
  'CreateReview'
  'Business'
  ($scope, CreateReview, Business)->
    Business.get()
      .success (data)->
        $scope.businesses = data

]

.controller 'ReviewItemCtrl', [
  '$scope'
  'CreateReview'
  'MenuItem'
  '$stateParams'
  ($scope, CreateReview, MenuItem, $stateParams)->
    $scope.businessId = $stateParams.businessId
    CreateReview.set('business', $scope.businessId)
    $scope.review = CreateReview.get()
    MenuItem.getByBusiness($scope.businessId)
      .success (data)->
        $scope.items = data

]

.controller 'createItemCtrl', [
  '$scope'
  'CreateReview'
  ($scope, CreateReview)->

]
.controller 'createReviewCtrl', [
  '$scope'
  'CreateReview'
  '$stateParams'
  'MenuItem'
  'Business'
  ($scope, CreateReview, $stateParams, MenuItem, Business)->
    $scope.itemId = $stateParams.itemId
    CreateReview.set('item_id', $scope.itemId)
    $scope.review = CreateReview.get()
    Business.find(CreateReview.get('business'))
      .success (data)->
        $scope.business = data
    MenuItem.find($scope.itemId)
      .success (data)->
        $scope.item = data

    $scope.rating = 0
    $scope.buttons = [1,2,3,4,5]
    $scope.setRate = (index)->
      if $scope.rating is index then $scope.rating = 0 else $scope.rating = index
      CreateReview.set('rating', $scope.rating)
    $scope.submitReview = ->
      console.log CreateReview.get()
]
