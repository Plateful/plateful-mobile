(function() {
  var LoginCtrl = function($scope, $ionicModal, Auth, User, FbLogin) {
    var vm = this;
    vm.status = User.status;
    FbLogin.getStatus();

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

    vm.isSignedIn = Auth.isSignedIn();

    console.log( "Logged",vm.isSignedIn);

    //////////////////////

    function nativeSignup() {
      User.signup(vm.username.toLowerCase(), vm.password);
      vm.isSignedIn = Auth.isSignedIn();
    }
    function nativeLogin() {
      User.login(vm.username.toLowerCase(), vm.password);
      vm.isSignedIn = Auth.isSignedIn();
    }
    function fbLogin() {
      FbLogin.login();
    }
    function fbLoginFlow() {
      FbLogin.loginFlow();
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
    function nativeLogout(){
      User.logout();
      vm.isSignedIn = false;
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
    .module('app.states.login', [])
    .controller('LoginCtrl', LoginCtrl);
})();
