angular.module('clurtch.components.tabs.find.controllers', [])


.controller 'FindCtrl', [
  '$scope'
  'Yelp'
  ($scope, Yelp)->
    Yelp.get().success (data) ->
      $scope.items = data.businesses
      for item in $scope.items
        tempRating = item.rating
        stars = ''
        while tempRating >= 1
          stars += '★'
          tempRating--
        if tempRating % 1 > 0
          stars += '½'
        item.stars = stars
]
