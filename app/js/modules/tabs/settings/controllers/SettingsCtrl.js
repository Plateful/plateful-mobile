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

      Restangular.all('users').all('login').post( vm.username, vm.password )
        .then(function(err, result){
          if (err) throw
            Auth.setAuthToken( result.user.username, result.sessionsToken, result.user );
        })

    }

  };
  SettingsCtrl
    .$inject = ['$scope', '$ionicModal', 'Auth'];
  angular
    .module('app.modules.tabs.settings.controllers', [])
    .controller('SettingsCtrl', SettingsCtrl);
})();
