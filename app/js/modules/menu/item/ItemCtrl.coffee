angular.module('clurtch.modules.menu.item')

.controller('ItemCtrl', [
  '$scope'
  '$stateParams'
  '$http'
  ($scope, $stateParams, $http, MenuItem) ->
    # $scope.businessId = $stateParams.businessId
    $scope.itemId = $stateParams.itemId
    MenuItem.find($scope.itemId)
      .success (data)->
        $scope.item = data

])
