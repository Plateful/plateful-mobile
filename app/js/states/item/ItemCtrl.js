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
  var ItemCtrl = function(resolvedItem, $scope, $stateParams, Item, User, UserStorage) {
    var vm = this;

    // Data from resolve
    vm.item = resolvedItem.item;
    vm.map = resolvedItem.map;
    vm.marker = resolvedItem.marker;
    vm.options = resolvedItem.options;
    vm.item_id = resolvedItem.item_id;

    // initial scope data
    vm.showPhotos     = showPhotos;
    vm.showReviews    = showReviews;
    vm.reviewItem     = reviewItem;
    vm.collectItem    = collectItem;
    vm.unCollectItem  = unCollectItem;
    vm.bookmarkItem   = bookmarkItem;
    vm.unBookmarkItem = unBookmarkItem;
    vm.bookmarkItem = bookmarkItem;

    vm.has_bookmarked = false;
    vm.has_collected = false;

    vm.showPhotos();
    checkUserStorage();

    //////////////////////

    function checkUserStorage(){
      UserStorage
        .checkData('collection', vm.item_id)
        .then(function (data){
          console.log(data);
          if(data) vm.has_collected = true;
        });
      UserStorage
        .checkData('bookmarks', vm.item_id)
        .then(function (data){
          console.log(data);
          if(data) vm.has_bookmarked = true;
        });
    }

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

    function collectItem() {

      User
        .collectItem( vm.item )
        .then(function (data){
          console.log("collected",data);
          vm.has_collected = true;
        });

    }
    function unCollectItem(){

      User
        .unCollectItem( vm.item )
        .then(function (data){
          console.log("unCollected",data);
          vm.has_collected = false;
        });

    }
    function bookmarkItem(){

      User
        .bookmarkItem(vm.item)
        .then( function ( data ){
          vm.has_bookmarked = true;
        });

    }
    function unBookmarkItem(){

      User
        .unBookmarkItem(vm.item)
        .then( function ( data ){
          vm.has_bookmarked = false;
        });

    }
  };

  ItemCtrl
    .$inject = [
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
