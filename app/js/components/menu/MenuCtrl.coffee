angular.module('clurtch.components.menu')

.controller('MenuCtrl', [
  '$scope'
  '$stateParams'
  '$http'
  'ServerUrl'
  ($scope, $stateParams, $http, ServerUrl) ->
    $scope.businessId = $stateParams.businessId
    $http.get(ServerUrl + 'api/businesses/' + $scope.businessId)
      .success((data) ->
        $scope.business = data
      )
])
