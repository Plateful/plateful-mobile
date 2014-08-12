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
  var ItemCtrl = function(resolvedItem, $scope, $stateParams, $http, Item, Review, $ionicLoading, Rest, makeStars, Auth, MakeMap, BackgroundGeo, $log) {
    var makeStars;
    var vm = this
    console.log(resolvedItem)
    // resolvedItem.then(function(data){
    vm.item = resolvedItem.item
    vm.map = resolvedItem.map
    vm.marker = resolvedItem.marker
    vm.options = resolvedItem.options
    vm.item_id = resolvedItem.item_id
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



    //     BackgroundGeo
    //       .current()
    //       .then(function (data){
    //         // vm.map = {center: {latitude: 51.219053, longitude: 4.404418}, zoom: 14 };
    //         vm.lat = data.latitude
    //         vm.lng = data.longitude
    //         // vm.map.setCenter(vm.center);
    //         // MakeMap.initialize(vm, vm.lat, vm.lng)
    //       })
    //   });

<<<<<<< HEAD


=======
    Item
      .find(vm.item_id)
      .then(function(data) {
        vm.item = data
      });

>>>>>>> Update: Items View | add link to shared item sate.
    // vm.item = Item.getStorage(vm.item_id);

    vm.showPhotos   = showPhotos;
    vm.showReviews  = showReviews;
    vm.reviewItem   = reviewItem;
    vm.collectItem  = collectItem;
    vm.bookmarkItem = bookmarkItem;

    vm.showPhotos()

    //////////////////////

    function showPhotos() {
      Item
        .getItemPhotos(vm.item_id)
        .then(function(data){
          console.log("photos", data);
          vm.photos = data
        })
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
      'MakeMap',
      'BackgroundGeo',
      '$log'
    ];
  angular
    .module('app.modules.states.item')
    .controller('ItemCtrl', ItemCtrl);
})();
