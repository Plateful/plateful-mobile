angular.module('clurtch.components.tabs.nearby.controllers')


.controller 'NearbyCtrl', [
  '$scope'
  'Yelp'
  ($scope, Yelp)->
    Yelp.get().success (data) ->
      $scope.businesses = data.businesses
      console.log($scope.businesses)
]
