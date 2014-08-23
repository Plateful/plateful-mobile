(function() {
  var SettingsCtrl = function($scope, Auth) {
    var vm = this;
    vm.isSignedIn = Auth.isSignedIn;
  };
  SettingsCtrl
    .$inject = [
      '$scope',
      'Auth'
    ];
  angular
    .module('app.tabs.settings.controllers', [])
    .controller('SettingsCtrl', SettingsCtrl);
})();
