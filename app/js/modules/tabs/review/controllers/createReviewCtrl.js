(function() {
  (function() {
    var createReviewCtrl;
    createReviewCtrl = function($scope, CreateReview, $stateParams, MenuItem, Menu, Review, ServerUrl) {
      this.item_id = $stateParams.itemId;
      CreateReview.set('item_id', this.item_id);
      this.review = CreateReview.get();
      Menu.find(CreateReview.get('menu')).then(function(data) {
        return this.menu = data;
      });
      MenuItem.find(this.item_id).then((function(_this) {
        return function(data) {
          return _this.item = data;
        };
      })(this));
      this.rating = 0;
      this.buttons = [1, 2, 3, 4, 5];
      this.setRate = (function(_this) {
        return function(index) {
          if (_this.rating === index) {
            _this.rating = 0;
          } else {
            _this.rating = index;
          }
          return CreateReview.set('rating', _this.rating);
        };
      })(this);
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

}).call(this);
