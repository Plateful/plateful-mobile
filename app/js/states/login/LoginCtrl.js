(function() {
  var LoginCtrl = function($scope, $ionicModal, Auth, User, FbLogin, $state, $ionicLoading) {
    var vm = this;
    vm.status = User.status;
    vm.isSignedIn = Auth.isSignedIn();
    vm.fbStatus = FbLogin.getStatus();

    $ionicModal
      .fromTemplateUrl("js/states/login/views/loginModal.html", {
        scope: $scope,
        animation: "slide-in-up"
      })
      .then(function(modal) {
        vm.loginModal = modal;
      });

    $ionicModal
      .fromTemplateUrl("js/states/login/views/signupModal.html", {
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

    $scope.$watch(function () {
        return FbLogin.status;
      },
      function (newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
          vm.fbStatus = FbLogin.status;
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
    vm.nativeLogout   = nativeLogout;

    //////////////////////

    function nativeSignup() {
      loginLoading('Creating your account...');
      User.signup(vm.username.toLowerCase(), vm.password)
        .then(loginConfirmed)
        .catch(loginFailed);
    }
    function nativeLogin() {
      loginLoading('Logging you in...');
      User.login(vm.username.toLowerCase(), vm.password)
        .then(loginConfirmed)
        .catch(loginFailed);
    }
    function fbLogin() {
      FbLogin.login();
    }
    function fbLoginFlow() {
      loginLoading('Logging you in through Facebook...');
      FbLogin.loginFlow()
        .then(loginConfirmed)
        .catch(loginFailed);
    }
    function fbLogout() {
      FbLogin.logout();
    }
    function fbGetInfo() {
      FbLogin.getInfo();
    }
    function fbShare() {
      FbLogin.share();
    }
    function fbGetToken() {
      FbLogin.getFbToken();
      User.logout();
    }
    function nativeLogout() {
      User.logout();
      if (vm.fbStatus) {
        vm.fbLogout();
      }
      vm.isSignedIn = false;
    }
    function loginLoading(msg) {
      $ionicLoading.show({template: msg});
      vm.statusMessage = '';
    }
    function loginConfirmed() {
      $ionicLoading.hide();
      $state.go('tab.settings')
      vm.isSignedIn = Auth.isSignedIn();
    }
    function loginFailed(errorMsg) {
      $ionicLoading.hide();
      vm.statusMessage = errorMsg.data.message;
    }

  };

  LoginCtrl
    .$inject = [
      '$scope',
      '$ionicModal',
      'Auth',
      'User',
      'FbLogin',
      '$state',
      '$ionicLoading'
    ];
  angular
    .module('app.states.login', [])
    .controller('LoginCtrl', LoginCtrl);
})();
