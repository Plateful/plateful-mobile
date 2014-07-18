angular.module('ngRater', [])

.directive 'ngRater', ()->
  restrict: 'E'
  # scope:
  #   rating: '=rating'
  template: '<div class="button-bar"> <button class="button button-clear button-icon icon ion-ios7-star" ng-repeat="btn in buttons" ng-click="rating = $index" ng-class="{\'button-energized\': rating >= $index}"></button></div>'
  # controller: ($scope)->
  #
  #   $scope.buttons = [1,2,3,4,5]
  #
