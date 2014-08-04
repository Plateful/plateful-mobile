(function() {
  (function() {
    var ReviewItemCtrl;
    ReviewItemCtrl = function($scope, CreateReview, MenuItem, $stateParams) {
      this.menu_id = $stateParams.menu_id;
      CreateReview.set('menu', $scope.menu_id);
      this.review = CreateReview.get();
      Menu.find(this.menu_id).success((function(_this) {
        return function(data) {
          console.log("neo----", data[0][1]);
          $scope.menu = data[0][0];
          if (Array.isArray(data[0][1])) {
            _this.items = data[0][1];
            console.log($scope.items);
          } else {
            _this.items.push(data[0][1]);
          }
          return $ionicLoading.hide();
        };
      })(this));
    };
    ReviewItemCtrl.$inject = ['$scope', 'CreateReview', 'MenuItem', '$stateParams'];
    return angular.module('app.modules.tabs.review').controller('ReviewItemCtrl', ReviewItemCtrl);
  })();

}).call(this);
