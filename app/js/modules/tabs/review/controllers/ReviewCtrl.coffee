angular.module('clurtch.modules.tabs.review.controllers', [])

.service 'CreateReview', ()->
  review = {}

  get: (key)->
    review[key]
  set: (key, val)->
    review[key] = val

.controller 'ReviewCtrl', [
  '$scope'
  'CreateReview'
  ($scope, CreateReview)->
    # $scope.takePhoto = ()->
    #   options =
    #     quality: 75,
    #     targetWidth: 320,
    #     targetHeight: 320,
    #     saveToPhotoAlbum: true,
    #     destinationType: Camera.DestinationType.FILE_URI,
    #     sourceType : Camera.PictureSourceType.CAMERA,
    #     allowEdit : true
    #
    #   onSuccess = (imageData)->
    #       $scope.src = imageData
    #       $scope.$apply()
    #       CreateReview.set('image_url', imageData)
    #   onFail = (error)->
    #       $scope.src = error
    #   navigator.camera.getPicture(onSuccess, onFail, options)
    #
    # # $scope.takePhoto = ->
    # #   options =
    # #     quality : 75,
    # #     destinationType: Camera.DESTINATIONTYPE.DATA_URL,
    # #     allowEdit: true,
    # #     targetWidth: 100,
    # #     targetHeight: 100,
    # #     popoverOptions: CameraPopoverOptions,
    # #     saveToPhotoAlbum: false
    # #

]
