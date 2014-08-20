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
      $scope.submit = function() {
        var fail, ft, imgUrl, options, params, win;
        imgUrl = CreateReview.get('image_url');
        win = function(r) {
          console.log("Code = " + r.responseCode);
          return console.log("Response = " + r.response);
        };
        fail = function(error) {
          alert("An error has occurred: Code = " + error.code);
          console.log("upload error source " + error.source);
          return console.log("upload error target " + error.target);
        };
        options = new FileUploadOptions();
        options.fileKey = "image_url";
        options.fileName = imgUrl.substr(imgUrl.lastIndexOf('/') + 1);
        options.chunkedMode = false;
        options.mimeType = "image/jpeg";
        params = {};
        params.menu = "menu";
        params.rating = "rating";
        options.params = params;
        ft = new FileTransfer();
        return ft.upload(imgUrl, encodeURI('http://10.8.29.210:9000/api/v1/reviews'), win, fail, options);
      };
      $scope.takePhoto = function() {
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
          CreateReview.set('image_url', imageData);
          $scope.submit()
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
