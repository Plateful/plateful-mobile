angular.module('clurtch.components.tabs.find.controllers', [])


.controller 'FindCtrl', [
  '$scope'
  'Yelp'
  'SortTwoColumns'
  ($scope, Yelp, SortTwoColumns)->
    Yelp.get().success (data) ->
      $scope.items = $scope.sortTwoColumns data.businesses
]
