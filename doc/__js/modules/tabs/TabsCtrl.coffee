(->
  TabsCtrl = ($scope)->

    # Logic goes here -->

    return

  TabsCtrl
    .$inject = ['$scope']
  angular
    .module('app.modules.tabs')
    .controller('TabsCtrl', TabsCtrl)
)()
