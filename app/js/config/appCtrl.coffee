angular.module('clurtch')


.controller('AppCtrl', [
  '$scope'
  '$rootScope'
  '$ionicModal'
  '$ionicNavBarDelegate'
  ($scope, $rootScope, $ionicModal, $ionicNavBarDelegate) ->

    $ionicModal.fromTemplateUrl(
      'imageModal.html'
      ($ionicModal) ->
        $rootScope.imageModal = $ionicModal
      scope: $scope
      animation: 'slide-in-up'
    )
    $ionicModal.fromTemplateUrl(
      'collectModal.html'
      ($ionicModal) ->
        $rootScope.collectModal = $ionicModal
      scope: $scope
      animation: 'slide-in-up'
    )
    $ionicModal.fromTemplateUrl(
      'rateModal.html'
      ($ionicModal) ->
        $rootScope.rateModal = $ionicModal
      scope: $scope
      animation: 'slide-in-up'
    )
    $ionicModal.fromTemplateUrl(
      'createItemModal.html'
      ($ionicModal) ->
        $rootScope.createItemModal = $ionicModal
      scope: $scope
      animation: 'slide-in-up'
    )
    $scope.goBack = ()->
      $ionicNavBarDelegate.back()
])
