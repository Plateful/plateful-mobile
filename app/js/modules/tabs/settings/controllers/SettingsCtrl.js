(function() {
  (function() {
    var SettingsCtrl;
    SettingsCtrl = function($scope, $ionicModal, Auth) {
      this.initialize = (function(_this) {
        return function() {};
      })(this);
      $ionicModal.fromTemplateUrl("js/modules/tabs/settings/views/login.html", {
        scope: $scope,
        animation: "slide-in-up"
      }).then((function(_this) {
        return function(modal) {
          _this.loginModal = modal;
        };
      })(this));
      this.openModal = (function(_this) {
        return function() {
          return _this.loginModal.show();
        };
      })(this);
      this.closeModal = (function(_this) {
        return function() {
          return _this.loginModal.hide();
        };
      })(this);
      this.login = (function(_this) {
        return function() {
          return Auth.setAuthToken(_this.username, _this.password);
        };
      })(this);
      this.initialize();
    };
    SettingsCtrl.$inject = ['$scope', '$ionicModal', 'Auth'];
    return angular.module('app.modules.tabs.settings.controllers', []).controller('SettingsCtrl', SettingsCtrl);
  })();

}).call(this);
