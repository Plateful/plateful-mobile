(function() {
  var LoginCtrl = function($scope, $ionicModal, Auth, User, FbLogin) {
    var vm = this;
    vm.fbStatus = fbStatus();

    vm.nativeSignup   = nativeSignup;
    vm.nativeLogin    = nativeLogin;
    vm.fbLogin        = fbLogin;
    vm.fbLoginFlow    = fbLoginFlow;
    vm.fbLogout       = fbLogout;
    vm.fbGetInfo      = fbGetInfo;
    vm.fbShare        = fbShare;
    vm.fbGetToken     = fbGetToken;

    //////////////////////

    function nativeSignup() {
      User.signup(vm.username, vm.password);
    };
    function nativeLogin() {
      User.login(vm.username, vm.password);
    };
    function fbLogin() {
      FbLogin.login();
    };
    function fbLoginFlow() {
      FbLogin.loginFlow();
    };
    function fbLogout() {
      FbLogin.logout();
    };
    function fbGetInfo() {
      FbLogin.getInfo();
    };
    function fbStatus() {
      return FbLogin.getStatus();
    }
    function fbShare() {
      FbLogin.share();
    }
    function fbGetToken() {
      FbLogin.getFbToken();
    }
  };

  LoginCtrl
    .$inject = [
      '$scope', 
      '$ionicModal', 
      'Auth', 
      'User',
      'FbLogin'
    ];
  angular
    .module('app.modules.states.login', [])
    .controller('LoginCtrl', LoginCtrl);
})();
