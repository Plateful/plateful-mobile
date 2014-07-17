angular.module('clurtch.modules.states.item')

.controller('ItemCtrl', [
  '$scope'
  '$stateParams'
  '$http'
  'MenuItem'
  ($scope, $stateParams, $http, MenuItem) ->
    $scope.itemId = $stateParams.itemId
    MenuItem.find($scope.itemId)
      .success (data)->
        console.log data
        $scope.item = data
])
