(function() {
  var SettingsCtrl = function($scope) {
    var vm = this;
  };
  SettingsCtrl
    .$inject = ['$scope'];
  angular
    .module('app.tabs.settings.controllers', [])
    .controller('SettingsCtrl', SettingsCtrl);
})();
