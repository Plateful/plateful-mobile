(function() {
  angular.module('ngFadeIn', []).directive('ngFadeIn', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, ngModel) {
        TweenLite.to(element, 0, {autoAlpha:0});
        TweenLite.to(element, 2.5, {autoAlpha:1});
      }
    };
  });

}).call(this);
