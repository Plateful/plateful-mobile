(function(){
  var AccountCtrl = function($scope, UserStorage, Auth, User, FbLogin, $ionicModal){
    var vm = this;

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
    initializeLoginModal();
    initializeSignUpModal();
    watchUserStatus();
    watchFBStatus();


    ////////////

    function initializeLoginModal(){
      $ionicModal
        .fromTemplateUrl("js/states/login/views/loginModal.html", {
          scope: $scope,
          animation: "slide-in-up"
        })
        .then(function(modal) {
            vm.loginModal = modal;
            if(!Auth.isSignedIn()){
              vm.loginModal.show()
            }
        });
    }

    function initializeSignUpModal(){
      $ionicModal
        .fromTemplateUrl("js/states/login/views/signupModal.html", {
          scope: $scope,
          animation: "slide-in-up"
        })
        .then(function(modal) {
            vm.signupModal = modal;
        });
    }

    function watchUserStatus(){

      $scope.$watch(function () {
          return User.status;
        },
        function (newVal, oldVal) {
          if (typeof newVal !== 'undefined') {
            vm.status = User.status;
          }
        }
      );
    }

    function watchFBStatus(){

      $scope.$watch(function () {
          return FbLogin.status;
        },
        function (newVal, oldVal) {
          if (typeof newVal !== 'undefined') {
            vm.fbStatus = FbLogin.status;
          }
        }
      );
    }

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
  }

  AccountCtrl
    .$inject = [
      '$scope',
      'UserStorage',
      'Auth',
      'User',
      'FbLogin',
      '$ionicModal'
    ]
  angular
    .module('app.states.account')
    .controller('AccountCtrl', AccountCtrl)
}).call(this);