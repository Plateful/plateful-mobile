(function() {
  angular.module('ngSelect', []).directive('ngMultiSelect', function() {
    return {
      restrict: 'E',
      template: '<div class="button-bar"><button class="button button-small "ng-repeat="option in options" ng-class="{\'active\': option.active === true}" ng-click="activate(option.id)"> {{option.title}}</button></div>',
      scope: {
        multi: '=multiple',
        options: '=options'
      },
      controller: function($scope) {
        return $scope.activate = function(num) {
          var item, _i, _len, _ref, _results;
          _ref = $scope.options;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            if (item.id === num) {
              _results.push(item.active = !item.active);
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      }
    };
  }).directive('ngSingleSelect', function() {
    return {
      restrict: 'E',
      template: '<div class="button-bar"><button class="button button-small "ng-repeat="option in options" ng-class="{\'active\': option.active === true}" ng-click="activate(option.id, $index)"> {{option.title}}</button></div>',
      scope: {
        multi: '=multiple',
        options: '=options'
      },
      controller: function($scope) {
        $scope.active = false;
        return $scope.activate = function(num, index) {
          var item, _i, _len, _ref, _results;
          if ($scope.options[index].active === true) {
            return $scope.options[index].active = !$scope.options[index].active;
          } else {
            $scope.options[index].active = !$scope.options[index].active;
            _ref = $scope.options;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              if (item.id !== $scope.options[index].id) {
                _results.push(item.active = !$scope.options[index].active);
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          }
        };
      }
    };
  });

}).call(this);
