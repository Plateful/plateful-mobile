angular.module('clurtch.components.tabs.find.controllers', [])


.controller('FindCtrl', [
  '$scope'
  '$rootScope'
  '$ionicModal'
  'Yelp'
  'Geo'
  ($scope, $rootScope, $ionicModal, Yelp, Geo)->
    Yelp.get().success (data) ->
      $scope.items = data.businesses
      # Convert rating to stars in unicode
      for item in $scope.items
        tempRating = item.rating
        stars = ''
        while tempRating >= 1
          stars += '★'
          tempRating--
        if tempRating % 1 > 0
          stars += '½'
        item.stars = stars

    $rootScope.activateButton = (num) ->
      if $rootScope.active is num
        $rootScope.active = off
      else
        $rootScope.active = num

    # Get the latitude and longitude of the user when app find tab loads
    Geo.getLocation().then(
      (position) ->
        lat = position.coords.latitude
        lng = position.coords.longitude
        console.log lat, lng
      (error) ->
        console.log 'Unable to get current location: ' + error
    )

])
