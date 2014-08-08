(function() {
  var SettingsCtrl = function($scope, $ionicModal, Auth, User, FbLogin) {
    var vm = this;

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

    vm.openModal  = openModal;
    vm.closeModal = closeModal;
    vm.signup     = signup;
    vm.login      = login;

    //////////////////////

    function openModal() {
      vm.loginModal.show();
    };
    function closeModal(){
      vm.loginModal.hide();
    };
    function signup() {
      User.signup(vm.username, vm.password);
    };
    function login() {
      User.login(vm.username, vm.password);
    };

  };
  SettingsCtrl
    .$inject = ['$scope', '$ionicModal', 'Auth', 'User', 'FbLogin'];
  angular
    .module('app.modules.tabs.settings.controllers', [])
    .controller('SettingsCtrl', SettingsCtrl);
})();
