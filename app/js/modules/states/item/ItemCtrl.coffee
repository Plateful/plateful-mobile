angular.module('clurtch.modules.states.item')

.controller('ItemCtrl', [
  '$scope'
  '$stateParams'
  '$http'
  'MenuItem'
  'Review'
  ($scope, $stateParams, $http, MenuItem, Review) ->
    $scope.itemId = $stateParams.itemId
    MenuItem.find($scope.itemId)
      .success (data)->
        $scope.item = data
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
        console.log(data)
        $scope.reviews = data
      .error (err) ->
        console.log(err)
])
