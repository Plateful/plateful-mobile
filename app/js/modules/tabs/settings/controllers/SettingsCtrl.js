(function() {
  var SettingsCtrl = function($scope, $ionicModal, Auth) {
    var vm = this

    $ionicModal

      .fromTemplateUrl("js/modules/tabs/settings/views/login.html", {

        scope: $scope,
        animation: "slide-in-up"

      })
      .then(function(modal) {

          vm.loginModal = modal;

      })

    vm.openModal  = openModal
    vm.closeModal = closeModal
    vm.login      = login

    //////////////////////

    function openModal() {
        vm.loginModal.show();
    };
    function closeModal(){
      vm.loginModal.hide();
    }
    function login(){
      Auth.setAuthToken( vm.username, vm.password );
    }

  };
  SettingsCtrl
    .$inject = ['$scope', '$ionicModal', 'Auth'];
  angular
    .module('app.modules.tabs.settings.controllers', [])
    .controller('SettingsCtrl', SettingsCtrl);
})();
