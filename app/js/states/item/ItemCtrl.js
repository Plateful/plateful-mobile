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
  var ItemCtrl = function(resolvedItem, $scope, $stateParams, $http, Item, Review, $ionicLoading, Rest, makeStars, Auth, BackgroundGeo, $log, User, UserStorage) {
    var vm = this;

    vm.item = resolvedItem.item;
    vm.map = resolvedItem.map;
    vm.marker = resolvedItem.marker;
    vm.options = resolvedItem.options;
    vm.item_id = resolvedItem.item_id;
    vm.has_collected = false;
    vm.has_bookmarked = false;
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
    // UserStorage
    //   .collection(vm.item_id)
    //   .then( function (data) {
    //     if(data.length){
    //       vm.has_collected = true;
    //     }
    //   });
    // UserStorage
    //   .bookmarks(vm.item_id)
    //   .then( function (data) {
    //     if(data.length){
    //       vm.has_bookmarked = true;
    //     }
    //   });


    // })
    // vm.item_id = $stateParams.itemId;
    // vm.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 15 }

    // Item
    //   .find(vm.item_id)
    //   .then(function(data) {
    //     console.log("item", data);
    //     vm.item = data[0]
    //     // vm.options = {scrollwheel: false};

    //     vm.options = {scrollwheel: false};
    //     vm.map = {center: {latitude: vm.item.menu.latitude, longitude: vm.item.menu.longitude }, zoom: 15 }
    //     vm.marker = {
    //         id: vm.item._id,
    //         coords: {
    //             // latitude: 40.1451,
    //             // longitude: -99.6680

    //             latitude: vm.item.menu.latitude,
    //             longitude: vm.item.menu.longitude
    //         },
    //         options: { draggable: true },
    //         events: {
    //             dragend: function (marker, eventName, args) {
    //                 $log.log('marker dragend');
    //                 $log.log(marker.getPosition().lat());
    //                 $log.log(marker.getPosition().lng());
    //             }
    //         }
    //     }





    // vm.item = Item.getStorage(vm.item_id);

    vm.showPhotos     = showPhotos;
    vm.showReviews    = showReviews;
    vm.reviewItem     = reviewItem;
    vm.collectItem    = collectItem;
    vm.unCollectItem  = unCollectItem;
    vm.bookmarkItem   = bookmarkItem;
    vm.unBookmarkItem = unBookmarkItem;


    vm.bookmarkItem = bookmarkItem;

    vm.showPhotos();

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
    function collectItem() {
      User
        .collectItem( vm.item )
        .then(function (data){
          console.log("collected",data);
          vm.has_collected = true;
        });

      // alert('item collected');
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
      '$http',
      'MenuItem',
      'Review',
      '$ionicLoading',
      'Restangular',
      'makeStars',
      'Auth',
      'BackgroundGeo',
      '$log',
      'User',
      'UserStorage'
    ];
  angular
    .module('app.states.item')
    .controller('ItemCtrl', ItemCtrl);
})();
