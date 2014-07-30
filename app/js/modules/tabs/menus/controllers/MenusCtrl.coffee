angular.module('app.modules.tabs.menus.controllers', [])


.controller( 'MenusCtrl', [
  '$scope'
  'Menu'
  '$timeout'
  '$rootScope'
  '$document'
  'ngGPlacesAPI'
  ($scope, Menu, $timeout, $rootScope, $document, ngGPlacesAPI)->
    # window.currLocation from the background Geo Location
    $scope.locate = window.currLocation.coords
    # $scope.locations = []
    geocoder = new google.maps.Geocoder()
    searchEventTimeout = undefined

    searchInputElement = angular.element($document.find('#searchQuery'))
    $scope.selectLocation = (location)->
        # ngModel.$setViewValue(location)
        # ngModel.$render()
        # el.element.css('display', 'none')
        # $ionicBackdrop.release()

    ngGPlacesAPI.nearbySearch({vicinity: 'San Francisco', latitude:$scope.locate.latitude, longitude:$scope.locate.longitude})
      .then( (data)->
        $scope.locations = data
        console.log data
      )


    # set the data to pass into the Menu Service

    #  Menu service takes (data, callback, searchValue)
    # LocationData = {lat: $scope.locate.latitude,lng: $scope.locate.longitude}
    # Menu.getByLocation(LocationData, (newData, key)->
    #   console.log newData
    #   $scope.menusFilter = key
    #   $scope.Menus = newData
    # )
    # $scope.newSearch = (nearbyFilter)->
    #   # in order to reset the cache filter
    #   # set the search filter to "empty" if empty
    #   menusFilter = menusFilter or "empty"
    #
    #   Menu.getByLocation(LocationData, (newData, key)->
    #     $scope.menusFilter = key
    #     $scope.Menus = newData
    #   , menusFilter)
])
