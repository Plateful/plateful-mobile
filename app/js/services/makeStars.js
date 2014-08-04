(function() {
  (function() {
    var makeStars;
    makeStars = function() {
      return {
        set: function(item) {
          var num;
          num = Math.random() * 5;
          return '★★★★★½'.slice(5.75 - num, 6.25 - Math.abs(num % 1 - 0.5));
        },
        get: function(num) {
          return '★★★★★½'.slice(5.75 - num, 6.25 - Math.abs(num % 1 - 0.5));
        }
      };
    };
    return angular.module('app').service('makeStars', makeStars);
  })();

}).call(this);
