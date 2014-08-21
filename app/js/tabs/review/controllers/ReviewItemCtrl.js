(function() {
  var ReviewItemCtrl = function($scope, CreateReview, Menu, $stateParams, menuItemsInit, menuInit) {

    var reviewItem = this;

    reviewItem.menu = menuInit;
    reviewItem.items = menuItemsInit;
    console.log(reviewItem.menu);

    reviewItem.menu_id = $stateParams.menu_id;

    CreateReview.set('menu_id', reviewItem.menu._id);

    this.review = CreateReview.get();

    ////////////////

  };
  ReviewItemCtrl
    .$inject = ['$scope', 'CreateReview', 'Menu', '$stateParams', 'menuItemsInit', 'menuInit'];
  angular
    .module('app.tabs.review')
    .controller('ReviewItemCtrl', ReviewItemCtrl);
})();
