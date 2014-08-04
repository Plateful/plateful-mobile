(function() {
  (function() {

    /*
     * [ItemCtrl description]
     * @param {[type]} $scope        [description]
     * @param {[type]} $stateParams  [description]
     * @param {[type]} $http         [description]
     * @param {[type]} Item          [description]
     * @param {[type]} Review        [description]
     * @param {[type]} $ionicLoading [description]
     * @param {[type]} Rest          [description]
     */
    var ItemCtrl;
    ItemCtrl = function($scope, $stateParams, $http, Item, Review, $ionicLoading, Rest) {
      var makeStars;
      this.item_id = $stateParams.itemId;
      this.initialize = (function(_this) {
        return function() {
          Item.find(_this.item_id).then(function(data) {
            _this.item = data[0];
            return _this.item.stars = makeStars(_this.item.rating);
          });
          return _this.item = Item.getStorage(_this.item_id);
        };
      })(this);
      makeStars = function(rating) {
        return '★★★★★½'.slice(5.75 - rating, 6.25 - Math.abs(rating % 1 - 0.5));
      };
      this.showPhotos = function() {
        return Item.getItemGallery(this.item_id).then(function(photos) {
          return this.photos = photos;
        });
      };
      this.showReviews = function() {
        return Item.getItemReviews(this.item_id).then(function(reviews) {
          return this.reviews = reviews;
        });
      };
      this.reviewItem = function() {
        return alert('item reviewed');
      };
      this.collectItem = function() {
        return alert('item collected');
      };
      this.bookmarkItem = function() {
        return alert('item bookmarked');
      };
      this.initialize();
    };
    ItemCtrl.$inject = ['$scope', '$stateParams', '$http', 'MenuItem', 'Review', '$ionicLoading', 'Restangular'];
    return angular.module('app.modules.states.item').controller('ItemCtrl', ItemCtrl);
  })();

}).call(this);
