
/**
 * @name  Review   Factory
 * @param {Service} Restangular RestangularServiceProvider
 */

(function() {
  var Review;

  Review = function(Restangular) {
    var Rest;
    Rest = Restangular.all('reviews');
    return {
      find: function(id) {
        return Restangular.one('reviews', id);
      },
      getByMenu: function(menu_id) {
        return Rest.one('menu', menu_id);
      },
      getByUser: function(user_id) {
        return Rest.one('user', user_id);
      },
      getByItemId: function(item_id) {
        return Rest.one('item', item_id);
      },
      create: function(data) {
        return Rest.post(data);
      },
      destroy: function(id) {
        return Restangular.one('review', id).remove();
      }
    };
  };

  Review.$inject = ['Restangular'];

  angular.module('app.factory.review', []).factory('Review', Review);

}).call(this);
