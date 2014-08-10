(function() {
  var LoginCtrl = function($scope, $ionicModal, Auth, User, FbLogin) {
    var vm = this;
    vm.fbStatus = fbStatus();
    vm.status = User.status;

    $ionicModal
      .fromTemplateUrl("js/modules/states/login/views/loginModal.html", {
        scope: $scope,
        animation: "slide-in-up"
      })
      .then(function(modal) {
          vm.loginModal = modal;
      });

    $ionicModal
      .fromTemplateUrl("js/modules/states/login/views/signupModal.html", {
        scope: $scope,
        animation: "slide-in-up"
      })
      .then(function(modal) {
          vm.signupModal = modal;
      });

    // Watch for changes on the User status property and update the view.
    $scope.$watch(function () { 
        return User.status; 
      }, 
      function (newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
          vm.status = User.status;
        }
      }
    );

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
      User.signup(vm.username.toLowerCase(), vm.password);
    };
    function nativeLogin() {
      User.login(vm.username.toLowerCase(), vm.password);
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
