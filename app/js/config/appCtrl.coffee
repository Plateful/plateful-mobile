angular.module('clurtch')


.controller('AppCtrl', [
  '$scope'
  '$rootScope'
  '$ionicModal'
  '$ionicNavBarDelegate'
  'CreateReview'
  ($scope, $rootScope, $ionicModal, $ionicNavBarDelegate, CreateReview) ->

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
    $scope.goBack = ()->
      $ionicNavBarDelegate.back()
    $scope.takePhoto = ()->
      options =
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        # saveToPhotoAlbum: true,
        destinationType: Camera.DestinationType.FILE_URI,
        # sourceType : Camera.PictureSourceType.CAMERA,
        sourceType : 0,
        encodingType: 0,
        allowEdit : true

      onSuccess = (imageData)->
          $scope.src = imageData
          $scope.$apply()
          CreateReview.set('image_url', imageData)
      onFail = (error)->
          $scope.src = error
      navigator.camera.getPicture(onSuccess, onFail, options)

    # $scope.takePhoto = ->
    #   options =
    #     quality : 75,
    #     destinationType: Camera.DESTINATIONTYPE.DATA_URL,
    #     allowEdit: true,
    #     targetWidth: 100,
    #     targetHeight: 100,
    #     popoverOptions: CameraPopoverOptions,
    #     saveToPhotoAlbum: false
    #
])
