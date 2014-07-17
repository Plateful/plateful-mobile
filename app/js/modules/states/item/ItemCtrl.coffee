angular.module('clurtch.modules.states.item')

.controller('ItemCtrl', [
  '$scope'
  '$stateParams'
  '$http'
  ($scope, $stateParams, $http, MenuItem) ->
    $scope.itemId = $stateParams.itemId
    MenuItem.find($scope.itemId)
      .success (data)->
        $scope.item = data
])
