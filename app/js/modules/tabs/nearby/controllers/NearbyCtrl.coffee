angular.module('clurtch.modules.tabs.nearby.controllers', [])


.controller 'NearbyCtrl', [
  '$scope'
  'Business'
  ($scope, Business)->
    Business.get().success (data) ->
      $scope.businesses = data
      console.log($scope.businesses)
]
