(function() {
  (function() {
    var CreateReview;
    CreateReview = function() {
      var review = {};
      return {
        get: function(key) {
          if (key) {
            return review[key];
          }
          return review;
        },
        set: function(key, val) {
          return review[key] = val;
        }
      };
    };
    return angular.module('app').factory('CreateReview', CreateReview);
  })();

}).call(this);
