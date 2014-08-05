
/**
 * @name Photo Factory
 * @param {Restangular} Restangular RestangularServiceProvider
 */

(function() {
  var Photo;

  Photo = function(Restangular) {
    var Rest;
    Rest = Restangular.all('photos');
    return {
      find: function(id) {
        return Restangular.one('photos', id);
      },
      getUserAlbum: function(user_id) {
        return Rest.one('user', user_id);
      },
      getItemGallery: function(item_id) {
        return Rest.one('item', item_id);
      },
      getByReview: function(review_id) {
        return Rest.one('review', review_id);
      }
    };
  };

  Photo.$inject = ['Restangular'];

  angular.module('app.factory.photo', []).factory('Photo', Photo);

}).call(this);
