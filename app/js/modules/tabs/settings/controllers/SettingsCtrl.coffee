(->
  SettingsCtrl = ($scope)->

    # Logic goes here -->

    return

  SettingsCtrl
    .$inject = ['$scope']
  angular
    .module('app.modules.tabs.settings.controllers', [])
    .controller('SettingsCtrl', SettingsCtrl)

)()
