angular.module('clurtch.modules.tabs.nearby.controllers', [])


.controller 'NearbyCtrl', [
  '$rootScope'
  '$scope'
  'Business'
  'Geo'
  ($rootScope, $scope, Business, Geo)->
    $scope.currL = window.currLocation

    Business.getByLocation({
      lat: $scope.currL.coords.latitude,
      lng: $scope.currL.coords.longitude
      })
      # Business.get()
      .success (data) ->
        $scope.businesses = data
        console.log($scope.businesses)
      .error (msg)->
        console.log(msg)
    # console.log lng, lat
]
