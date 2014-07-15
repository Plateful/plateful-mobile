angular.module('clurtch.components.menu.item')

.controller('ItemCtrl', [
  '$scope'
  '$stateParams'
  '$http'
  ($scope, $stateParams, $http) ->
    $scope.businessId = $stateParams.businessId
    $scope.itemId = $stateParams.itemId
])
