angular.module('app.modules.states.item')

.controller('ItemCtrl', [
  '$scope'
  '$stateParams'
  '$http'
  'MenuItem'
  'Review'
  '$ionicLoading'
  'Restangular'
  ($scope, $stateParams, $http, Item, Review, $ionicLoading, Rest) ->
    $scope.itemId = $stateParams.itemId

    # Create a star rating for the item, based on the item's rating property
    makeStars = (rating)->
      '★★★★★½'.slice(5.75-rating, 6.25-Math.abs(rating%1-0.5))

    # Item.find($scope.itemId).get()
    #   .then (data)->
    #     $scope.item = data[0]
    #     $scope.item.stars = makeStars($scope.item.rating)

    $scope.item = Item.getStorage($scope.itemId)
    console.log $scope.item

    # Review.getByItemId($scope.itemId).get()
    #   .then (data) ->
    #     $scope.reviews = data
    #     $ionicLoading.hide()

    # As a user, I want to see all the photos of this item
    $scope.showPhotos = ()->
      Item.getItemGallery($scope.item_id)
        .then (photos)->
          $scope.photos = photos

    # As a user, I want to see all the reviews regarding this item
    $scope.showReviews = ()->
      Item.getItemReviews($scope.item_id)
        .then (reviews)->
          $scope.reviews = reviews

    # As a user, I want to share my experience with this item
    $scope.reviewItem = ()->
      alert 'item reviewed'

    # As a user, I want to Collect this item
    $scope.collectItem = ()->
      alert 'item collected'

    # As a user, I want to Bookmark this item
    $scope.bookmarkItem = ()->
      alert 'item bookmarked'

])
