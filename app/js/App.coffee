# ==> Initialize angular's app.
app = angular.module("clurtch", [
  "ionic"
  "clurtch.components"
])
.controller('AppCtrl', [
  '$scope'
  '$rootScope'
  '$ionicModal'
  ($scope, $rootScope, $ionicModal) ->
    $ionicModal.fromTemplateUrl(
      'filterModal.html'
      ($ionicModal) ->
        $rootScope.modal = $ionicModal
      scope: $scope
      animation: 'slide-in-up'
    )
])

for k, v of GLOBALS
  app.constant k, v

# To debug, go to http://localhost:31173/client/#anonymous
if GLOBALS.WEINRE_ADDRESS && (ionic.Platform.isAndroid() || ionic.Platform.isIOS())
  addElement document, "script", id: "weinre-js", src: "http://#{GLOBALS.WEINRE_ADDRESS}/target/target-script-min.js#anonymous"
