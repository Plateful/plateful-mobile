###*
 * @name Photo Factory
 * @param {Restangular} Restangular RestangularServiceProvider
###
Photo = (Restangular)->
  Rest = Restangular.all('photos')
  find: (id)->
    Restangular.one('photos', id)
  getUserAlbum: (user_id)->
    Rest.one('user', user_id)
  getItemGallery: (item_id)->
    Rest.one('item', item_id)
  getByReview: (review_id)->
    Rest.one('review', review_id)

Photo
  .$inject = ['Restangular']
angular
  .module('app.factory.photo', [])
  .factory('Photo', Photo)
