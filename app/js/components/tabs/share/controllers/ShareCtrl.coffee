angular.module('clurtch.components.tabs.share.controllers')


.controller 'ShareCtrl', [
  '$scope'
  '$stateProvider'
  ($scope, $stateProvider)->
    $scope.share = $stateProvider.shareId
]
