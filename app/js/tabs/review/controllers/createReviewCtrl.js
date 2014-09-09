(function() {
  var createReviewCtrl = function($scope, CreateReview, Review, createReviewInit, Auth, $state, $ionicLoading) {
    if (!Auth.isSignedIn()) {
      $state.go('tab.logins');
    }

    var createReviewView = this;
    createReviewView.item = createReviewInit;
    createReviewView.buttons = [1, 2, 3, 4, 5];

    createReviewView.rating = 0;
    CreateReview.set('item_id', createReviewView.item._id);
    CreateReview.set('menu_id', createReviewView.item.menu_id);
    CreateReview.set('user_id', Number(Auth.get('user_id')));
    createReviewView.review = CreateReview.get();

    createReviewView.setStarRating = function(index) {
      if (createReviewView.rating === index) {
        createReviewView.rating = 0;
      } else {
        createReviewView.rating = index;
      }
      return CreateReview.set('rating', createReviewView.rating);
    };

    // Post review and then navigate back to menu items selection view.
    createReviewView.submitReview = function() {
      $ionicLoading.show({template: 'Posting your review...'});
      CreateReview.set('text', createReviewView.reviewText);
      var params = {
        item_id:  CreateReview.get('item_id'),
        menu_id:  CreateReview.get('menu_id'),
        user_id:  CreateReview.get('user_id'),
        rating:   CreateReview.get('rating'),
        text:     CreateReview.get('text')
      };
      Review.createTextOnly(params)
        .then(function() {
          $state.go('tab.review-choose-item', {menuId: params.menu_id});
          $ionicLoading.hide();
        });
    };

    // Post review with a photo. Needs to be reconfigured.
    createReviewView.submitPhotoReview = function() {
      var fail, ft, imgUrl, options, params, win;
      CreateReview.set('text', createReviewView.reviewText);
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
      params = {
        item_id: CreateReview.get('item_id'),
        menu_id: CreateReview.get('menu_id'),
        user_id: CreateReview.get('user_id'),
        rating: CreateReview.get('rating'),
        text: CreateReview.get('text')
      };
      options.params = params;
      ft = new FileTransfer();
      return ft.upload(imgUrl, encodeURI('http://192.168.1.9:9000/api/reviews'), win, fail, options);
    };
  };


  createReviewCtrl.$inject = ['$scope', 'CreateReview', 'Review', 'createReviewInit', 'Auth', '$state', '$ionicLoading'];
  return angular.module('app.tabs.review').controller('createReviewCtrl', createReviewCtrl);
})();
