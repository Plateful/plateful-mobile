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

  var ItemCtrl = function(checkUserCollection, checkUserBookmarks, showSingleItemPhotos, resolvedItem, $scope, $stateParams, Item, User, UserStorage) {
    var vm = this;

    // Data from resolve
    vm.item           = resolvedItem.item;
    vm.map            = resolvedItem.map;
    vm.marker         = resolvedItem.marker;
    vm.options        = resolvedItem.options;
    vm.item_id        = resolvedItem.item_id;
    vm.has_bookmarks  = checkUserBookmarks;
    vm.has_collection = checkUserCollection;
    vm.photos = showSingleItemPhotos;

    // initial scope data
    vm.showPhotos     = showPhotos;
    vm.showReviews    = showReviews;
    vm.reviewItem     = reviewItem;
    vm.interact       = interact;


    //////////////////////


    function showPhotos() {
      Item
        .getItemPhotos(vm.item_id)
        .then(function(data){
          // console.log("photos", data);
          vm.photos = data;
        });
    }

    function showReviews() {
      Item
        .getItemReviews(this.item_id)
        .then(function(reviews) {
          vm.reviews = reviews;
        });
    }

    function reviewItem() {

      alert('item reviewed');
    }

    function interact(key, bool) {

      User
        .interactWithItem(key, vm.item._id, !bool)
        .then(function (data){
          console.log("collected",data);
          vm['has_' + key] = !bool;
        });

    }

  };

  ItemCtrl
    .$inject = [
      'checkUserCollection',
      'checkUserBookmarks',
      'showSingleItemPhotos',
      'resolvedItem',
      '$scope',
      '$stateParams',
      'MenuItem',
      'User',
      'UserStorage'
    ];
  angular
    .module('app.states.item')
    .controller('ItemCtrl', ItemCtrl);
})();