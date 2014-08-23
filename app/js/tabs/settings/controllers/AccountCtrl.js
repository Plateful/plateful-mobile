(function() {
  var AccountCtrl = function($scope, Auth) {
    var account = this;
    var username = localStorage.getItem('user_email');
    account.isSignedIn = Auth.isSignedIn;

    account.update = update;

    /////////////////////////////////////////

    function update(username) {
      return User.update(username)
        .then(function (data) {
          return data;
        });
    }
  };

  AccountCtrl
    .$inject = [
      '$scope',
      'Auth'
    ];
  angular
    .module('app.tabs.settings')
    .controller('AccountCtrl', AccountCtrl);
})();
