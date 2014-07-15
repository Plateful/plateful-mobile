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

.directive('ngMultiSelect', ()->
  restrict: 'E'
  # transclude:true
  template: '<div class="button-bar"><button class="button button-small "ng-repeat="option in options" ng-class="{\'active\': option.active === true}" ng-click="activate(option.id)"> {{option.title}}</button></div>'
  scope:
    multi: '=multiple'
    options: '=options'
  controller: ($scope)->
    # $scope.options = $scope.option
    $scope.activate = (num)->
      # if $scope.multi is 'true'
      for item in $scope.options
        if item.id is num
          item.active = !item.active
)

.directive('ngSingleSelect', ()->
  restrict: 'E'
  # transclude:true
  template: '<div class="button-bar"><button class="button button-small "ng-repeat="option in options" ng-class="{\'active\': option.active === true}" ng-click="activate(option.id, $index)"> {{option.title}}</button></div>'
  scope:
    multi: '=multiple'
    options: '=options'
  controller: ($scope)->
    # $scope.options = $scope.option
    $scope.active = false
    $scope.activate = (num, index)->
      if $scope.options[index].active is true
        $scope.options[index].active = !$scope.options[index].active
      else
        $scope.options[index].active = !$scope.options[index].active
        for item in $scope.options
          unless item.id is $scope.options[index].id
            item.active = !$scope.options[index].active
)

for k, v of GLOBALS
  app.constant k, v

# To debug, go to http://localhost:31173/client/#anonymous
if GLOBALS.WEINRE_ADDRESS && (ionic.Platform.isAndroid() || ionic.Platform.isIOS())
  addElement document, "script", id: "weinre-js", src: "http://#{GLOBALS.WEINRE_ADDRESS}/target/target-script-min.js#anonymous"
