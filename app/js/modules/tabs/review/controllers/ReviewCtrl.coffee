angular.module('clurtch.modules.tabs.review.controllers', [])

.controller 'ReviewCtrl', [
  '$scope'

  ($scope)->
    $scope.takePhoto = ()->
      onSuccess = (imageData)->
        image = document.getElementById('myImage')
        image.src = 'data:image/jpeg;base64' + imageData
        $scope.src = 'data:image/jpeg;base64' + imageData
      onFail = (error)->
        alert(error)
      navigator.camera.getPicture(onSuccess, onFail,
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
      )

    # $scope.takePhoto = ->
    #   options =
    #     quality : 75,
    #     destinationType: Camera.DESTINATIONTYPE.DATA_URL,
    #     sourceType: Camera.PictureSourceType.CAMERA,
    #     allowEdit: true,
    #     encodingType: Camera.EncodingType.JPEG,
    #     targetWidth: 100,
    #     targetHeight: 100,
    #     popoverOptions: CameraPopoverOptions,
    #     saveToPhotoAlbum: false
    #
    #   navigator.getPicture(options).then (imageData)->
    #     $scope.imageData = imageData
    #   ,(err)->
    #     $scope.error = err


    # $scope.share = $stateProvider.shareId
]
