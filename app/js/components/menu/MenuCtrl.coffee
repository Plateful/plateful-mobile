angular.module('clurtch.components.menu')

.controller('MenuCtrl', [
  '$scope'
  '$stateParams'
  '$http'
  ($scope, $stateParams, $http) ->
    $scope.businessId = $stateParams.businessId
    $http.get('http://localhost:9000/api/businesses/' + $scope.businessId)
      .success((data) ->
        console.log data
        $scope.item = data
      )
])
