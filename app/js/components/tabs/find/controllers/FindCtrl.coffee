angular.module('clurtch.components.tabs.find.controllers', [])


.controller 'FindCtrl', [
  '$scope'
  'Yelp'
  ($scope, Yelp)->
    Yelp.get().success (data) ->
      $scope.items = data.businesses
]
