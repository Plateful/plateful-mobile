(function() {
  var ReviewItemCtrl = function($scope, CreateReview, MenuItem, $stateParams) {

    var vm = this

    vm.menu_id = $stateParams.menu_id;

    CreateReview.set('menu', $scope.menu_id);

    this.review = CreateReview.get();

    ////////////////

    Menu
      .find(this.menu_id)
      .success(function(data) {

        console.log("neo----", data[0][1]);

        vm.menu = data[0][0];

        if (Array.isArray(data[0][1])) {

          vm.items = data[0][1];

          console.log(vm.items);

        } else {

          vm.items.push(data[0][1]);

        }

        return $ionicLoading.hide();

      });

  };
  ReviewItemCtrl
    .$inject = ['$scope', 'CreateReview', 'MenuItem', '$stateParams'];
  angular
    .module('app.modules.tabs.review')
    .controller('ReviewItemCtrl', ReviewItemCtrl);
})();
