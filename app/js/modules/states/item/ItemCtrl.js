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
  var ItemCtrl = function($scope, $stateParams, $http, Item, Review, $ionicLoading, Rest, makeStars) {
    var makeStars;

    var vm = this

    vm.item_id = $stateParams.itemId;

    

    Item
      .find(vm.item_id)
      .then(function(data) {
        vm.item = data[0];
        vm.item.stars = makeStars(vm.item.rating);
      });

    vm.item = Item.getStorage(vm.item_id);

    vm.showPhotos   = showPhotos;
    vm.showReviews  = showReviews;
    vm.reviewItem   = reviewItem;
    vm.collectItem  = collectItem;


    //////////////////////


    function showPhotos() {
      Item
        .getItemGallery(this.item_id)
        .then(function(photos) {
          vm.photos = photos;
        });
    };
    function showReviews() {
      Item
        .getItemReviews(this.item_id)
        .then(function(reviews) {
          vm.reviews = reviews;
        });
    };
    function reviewItem() {

      alert('item reviewed');
    };
    function collectItem() {

      alert('item collected');
    };
    function bookmarkItem() {

      alert('item bookmarked');
    };
  };

  ItemCtrl
    .$inject = ['$scope', '$stateParams', '$http', 'MenuItem', 'Review', '$ionicLoading', 'Restangular', 'makeStars'];
  angular
    .module('app.modules.states.item')
    .controller('ItemCtrl', ItemCtrl);
})();
