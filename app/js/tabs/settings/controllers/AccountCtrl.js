(function() {
  var AccountCtrl = function($scope, Auth, User, Restangular, accountInit, $ionicLoading) {
    Restangular.setRestangularFields({
      id: 'username'
    });
    var account = this;
    var original = accountInit;
    account.user = Restangular.copy(original);
    account.isSignedIn = Auth.isSignedIn;

    account.update = update;

    /////////////////////////////////////////

    function update() {
      $ionicLoading.show({template:'Updating Info...'});
      account.user.put()
        .then(function(data) {
          $ionicLoading.hide();
        });
    }
  };

  AccountCtrl
    .$inject = ['$scope', 'Auth','User', 'Restangular', 'accountInit', '$ionicLoading'];
  angular
    .module('app.tabs.settings')
    .controller('AccountCtrl', AccountCtrl);
})();
