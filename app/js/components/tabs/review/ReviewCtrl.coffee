angular.module('clurtch.components.tabs.review.controllers', [
  # 'clurtch.components.tabs.review.controllers.comment'
])

.controller 'ReviewCtrl', [
  '$scope'
  ($scope)->
    $scope.takePhoto = ()->
      onSuccess = (imageData)->
        image = document.getElementById('myImage')
        image.src = 'data:image/jpeg;base64' + imageData
      onFail = (error)->
        alert(error)
      navigator.camera.getPicture(onSuccess, onFail,
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
      )

    # $scope.share = $stateProvider.shareId
]
