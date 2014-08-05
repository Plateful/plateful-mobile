(function() {
  var createReviewCtrl = function($scope, CreateReview, $stateParams, MenuItem, Menu, Review, ServerUrl) {
    var vm = this
    vm.item_id = $stateParams.itemId;
    CreateReview.set('item_id', vm.item_id);
    vm.review = CreateReview.get();
    Menu
      .find(CreateReview.get('menu'))
      .then(function(data) {
        vm.menu = data;
      });

    MenuItem
      .find(vm.item_id)
      .then(function(data) {
        v.item = data;
      });

    vm.rating = 0;
    vm.buttons = [1, 2, 3, 4, 5];
    vm.setRate = function(index) {
      if (vm.rating === index) {
        vm.rating = 0;
      } else {
        vm.rating = index;
      }
      return CreateReview.set('rating', vm.rating);
    };

    $scope.submitReview = function() {
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
      params.menu = CreateReview.get('menu');
      params.rating = CreateReview.get('rating');
      options.params = params;
      ft = new FileTransfer();
      return ft.upload(imgUrl, encodeURI('http://192.168.1.9:9000/api/reviews'), win, fail, options);
    };
  };
  createReviewCtrl.$inject = ['$scope', 'CreateReview', '$stateParams', 'MenuItem', 'Menu', 'Review', 'ServerUrl'];
  return angular.module('app').controller('createReviewCtrl', createReviewCtrl);
})();
