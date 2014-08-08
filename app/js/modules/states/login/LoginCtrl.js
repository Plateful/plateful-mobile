(function() {
  var LoginCtrl = function($scope, $ionicModal, Auth, User) {
    var vm = this;
    vm.fbStatus = fbStatus();

    // Defaults to sessionStorage for storing the Facebook token
    openFB.init({appId: '1495225764050843'});
    console.log("i'm in")

    //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
    //  openFB.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});



    $ionicModal
      .fromTemplateUrl("js/modules/tabs/settings/views/login.html", {
        scope: $scope,
        animation: "slide-in-up"
      })
      .then(function(modal) {
          vm.loginModal = modal;
      });

    $ionicModal
      .fromTemplateUrl("js/modules/tabs/settings/views/signup.html", {
        scope: $scope,
        animation: "slide-in-up"
      })
      .then(function(modal) {
          vm.signupModal = modal;
      });

    vm.nativeSignup   = nativeSignup;
    vm.nativeLogin    = nativeLogin;
    vm.fbLogin        = fbLogin;

    //////////////////////

    function nativeSignup() {
      User.signup(vm.username, vm.password);
    };
    function nativeLogin() {
      User.login(vm.username, vm.password);
    };
    function fbLogin() {
      openFB.login(
        function(response) {
        console.log(response);
          if(response.status === 'connected') {
            alert('Facebook login succeeded, got access token: ' + response.authResponse.token);
          } 
          else {
            alert('Facebook login failed: ' + response.error);
          }
        }, {scope: 'email,read_stream,publish_stream'}
      );
    };
    function fbStatus() {
      var status;
      openFB.getLoginStatus(function(foundStatus) {
        status = foundStatus.status;
      });
      console.log(status);
      return status;
    }

  };
  LoginCtrl
    .$inject = [
      '$scope', 
      '$ionicModal', 
      'Auth', 
      'User'
    ];
  angular
    .module('app.modules.states.login', [])
    .controller('LoginCtrl', LoginCtrl);
})();
