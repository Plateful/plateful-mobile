angular.module('clurtch.modules.states.item')

.controller('ItemCtrl', [
  '$scope'
  '$stateParams'
  '$http'
  'MenuItem'
  'Review'
  '$ionicLoading'
  ($scope, $stateParams, $http, MenuItem, Review, $ionicLoading) ->
    $scope.itemId = $stateParams.itemId
    $ionicLoading.show(
      noBackdrop: true,
      duration: 2000,
      template: 'Loading...'
    )
    MenuItem.find($scope.itemId)
      .success (data)->
        $scope.item = data[0]
        # console.log data
        #change Rating to Stars
        tempRating = $scope.item.rating
        stars = ''
        while tempRating >= 1
          stars += '★'
          tempRating--
        if tempRating % 1 > 0
          stars += '½'
        $scope.item.stars = stars
      .error (data) ->
        console.log data

    Review.getByItemId($scope.itemId)
      .success (data) ->
        # console.log(data)
        $scope.reviews = data
        $ionicLoading.hide()
        # console.log $scope.reviews
      .error (err) ->
        console.log(err)

])
