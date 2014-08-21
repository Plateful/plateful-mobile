(function() {
  var createReviewCtrl = function($scope, CreateReview, Review, createReviewInit) {
    var createReviewView = this;
    createReviewView.item = createReviewInit;
    createReviewView.buttons = [1, 2, 3, 4, 5];

    createReviewView.rating = 0;
    CreateReview.set('item_id', createReviewView.item._id);
    createReviewView.review = CreateReview.get();

    createReviewView.setStarRating = function(index) {
      if (createReviewView.rating === index) {
        createReviewView.rating = 0;
      } else {
        createReviewView.rating = index;
      }
      return CreateReview.set('rating', createReviewView.rating);
    };

    createReviewView.submitReview = function() {
      var fail, ft, imgUrl, options, params, win;
      CreateReview.set('text', createReviewView.reviewText);
      // imgUrl = CreateReview.get('image_url');
      // win = function(r) {
      //   console.log("Code = " + r.responseCode);
      //   return console.log("Response = " + r.response);
      // };
      // fail = function(error) {
      //   alert("An error has occurred: Code = " + error.code);
      //   console.log("upload error source " + error.source);
      //   return console.log("upload error target " + error.target);
      // };
      // options = new FileUploadOptions();
      // options.fileKey = "image_url";
      // options.fileName = imgUrl.substr(imgUrl.lastIndexOf('/') + 1);
      // options.chunkedMode = false;
      // options.mimeType = "image/jpeg";
      params = {};
      params.item_id = CreateReview.get('item_id');
      params.menu_id = CreateReview.get('menu_id');
      params.rating = CreateReview.get('rating');
      params.text = CreateReview.get('text');
      // options.params = params;
      // ft = new FileTransfer();
      // return ft.upload(imgUrl, encodeURI('http://192.168.1.9:9000/api/reviews'), win, fail, options);
    };
  };
  createReviewCtrl.$inject = ['$scope', 'CreateReview', 'Review', 'createReviewInit'];
  return angular.module('app.tabs.review').controller('createReviewCtrl', createReviewCtrl);
})();
