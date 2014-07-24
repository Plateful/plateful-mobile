angular.module('clurtch.modules.tabs.nearby.controllers', [])


.controller( 'NearbyCtrl', [
  '$scope'
  'Business'
  ($scope, Business)->
    # window.currLocation from the background Geo Location
    $scope.locate = window.currLocation.coords

    # set the data to pass into the Business Service
    #  Business service takes (data, callback, searchValue)
    LocationData = {lat: $scope.locate.latitude,lng: $scope.locate.longitude}
    Business.getByLocation(LocationData, (newData, key)->
      console.log newData
      $scope.nearbyFilter = key
      $scope.businesses = newData
    )
    $scope.newSearch = (nearbyFilter)->
      # in order to reset the cache filter
      # set the search filter to "empty" if empty
      nearbyFilter = nearbyFilter or "empty"

      Business.getByLocation(LocationData, (newData, key)->
        $scope.nearbyFilter = key
        $scope.businesses = newData
      , nearbyFilter)
])
