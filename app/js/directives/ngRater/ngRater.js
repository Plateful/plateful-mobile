(function() {
  angular.module('ngRater', []).directive('ngRater', function() {
    return {
      restrict: 'E',
      template: '<div class="button-bar"> <button class="button button-clear button-icon icon ion-ios7-star" ng-repeat="btn in buttons" ng-click="rating = $index" ng-class="{\'button-energized\': rating >= $index}"></button></div>'
    };
  });

}).call(this);
