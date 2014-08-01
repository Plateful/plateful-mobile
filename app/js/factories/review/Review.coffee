###*
 * @name  Review   Factory
 * @param {Service} Restangular RestangularServiceProvider
###
Review = (Restangular)->
  Rest = Restangular.all('reviews')
  find: (id)->
    Restangular.one('reviews', id)
  getByMenu: (menu_id)->
    Rest.one('menu', menu_id)
  getByUser: (user_id)->
    Rest.one('user', user_id)
  getByItemId: (item_id) ->
    Rest.one('item', item_id)
  create: (data)->
    Rest.post( data )
  destroy: (id)->
    Restangular.one('review', id).remove()

Review
  .$inject = ['Restangular']
angular
  .module('app.factory.review', [])
  .factory('Review', Review)
