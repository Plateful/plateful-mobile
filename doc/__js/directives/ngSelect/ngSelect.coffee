angular.module('ngSelect', [])

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
