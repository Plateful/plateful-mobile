angular.module('app')

# The App ctrl contains the $scope of the whole app
.controller('AppCtrl', [
  '$scope'
  '$rootScope'
  '$ionicModal'
  '$ionicNavBarDelegate'
  'CreateReview'
  'Geo'
  ($scope, $rootScope, $ionicModal, $ionicNavBarDelegate, CreateReview, Geo) ->

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
        sourceType : Camera.PictureSourceType.CAMERA,
        # sourceType : 0,
        encodingType: 0,
        allowEdit : true

      onSuccess = (imageData)->
          $scope.src = imageData
          $scope.$apply()
          # $scope.submitReview(imageData)
          CreateReview.set('image_url', imageData)
      onFail = (error)->
          $scope.src = error
          
      navigator.camera.getPicture(onSuccess, onFail, options)

      Geo.getLocation().then(
        (position) ->
          $scope.lat = position.coords.latitude
          $scope.lng = position.coords.longitude
          console.log $scope.lat, $scope.lng
        (error) ->
          console.log 'Unable to get current location: ' + error
      )

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
