angular.module('clurtch.modules.tabs.nearby.controllers', [])


.controller 'NearbyCtrl', [
  '$rootScope'
  '$scope'
  'Business'
  'Geo'
  '$ionicLoading'
  ($rootScope, $scope, Business, Geo, $ionicLoading)->
    $scope.currL = window.currLocation
    $ionicLoading.show(
      noBackdrop: true,
      duration: 2000,
      template: 'Loading...'
    )
    Business.getByLocation({
      lat: $scope.currL.coords.latitude,
      lng: $scope.currL.coords.longitude
      })
      # Business.get()
      .success (data) ->
        $scope.businesses = data
        $ionicLoading.hide()
        # console.log($scope.businesses)
      .error (msg)->
        console.log(msg)
    # console.log lng, lat
    $scope.newSearch = (search)->
      $ionicLoading.show(
        noBackdrop: true,
        duration: 2000,
        template: 'Loading...'
      )
      Business.getByLocation({
        val: search,
        lat: $scope.currL.coords.latitude,
        lng: $scope.currL.coords.longitude
        })
        # Business.get()
        .success (data) ->
          $ionicLoading.hide()
          $scope.businesses = data
          console.log($scope.businesses)
        .error (msg)->
          console.log(msg)
]
