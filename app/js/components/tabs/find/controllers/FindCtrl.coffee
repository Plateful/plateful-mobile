angular.module('clurtch.components.tabs.find.controllers', [])


.controller('FindCtrl', [
  '$scope'
  '$rootScope'
  '$ionicModal'
  'Yelp'
  ($scope, $rootScope, $ionicModal, Yelp)->
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
])
