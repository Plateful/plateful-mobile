(function() {
  angular.module('app').controller('AppCtrl', [
    '$scope', '$rootScope', '$ionicModal', '$ionicNavBarDelegate', 'CreateReview', 'BackgroundGeo', function($scope, $rootScope, $ionicModal, $ionicNavBarDelegate, CreateReview, BackgroundGeo) {
      $ionicModal.fromTemplateUrl('imageModal.html', function($ionicModal) {
        return $rootScope.imageModal = $ionicModal;
      }, {
        scope: $scope,
        animation: 'slide-in-up'
      });
      $ionicModal.fromTemplateUrl('collectModal.html', function($ionicModal) {
        return $rootScope.collectModal = $ionicModal;
      }, {
        scope: $scope,
        animation: 'slide-in-up'
      });
      $ionicModal.fromTemplateUrl('rateModal.html', function($ionicModal) {
        return $rootScope.rateModal = $ionicModal;
      }, {
        scope: $scope,
        animation: 'slide-in-up'
      });
      $scope.goBack = function() {
        return $ionicNavBarDelegate.back();
      };
      return $scope.takePhoto = function() {
        var onFail, onSuccess, options;
        options = {
          quality: 75,
          targetWidth: 320,
          targetHeight: 320,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: 0,
          allowEdit: true
        };
        onSuccess = function(imageData) {
          $scope.src = imageData;
          $scope.$apply();
          return CreateReview.set('image_url', imageData);
        };
        onFail = function(error) {
          return $scope.src = error;
        };
        navigator.camera.getPicture(onSuccess, onFail, options);
        return BackgroundGeo.current().then(function(position) {
          $scope.lat = position.latitude;
          $scope.lng = position.longitude;
          return console.log($scope.lat, $scope.lng);
        }, function(error) {
          return console.log('Unable to get current location: ' + error);
        });
      };
    }
  ]);

}).call(this);
