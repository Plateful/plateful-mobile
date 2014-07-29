angular.module('app.factory.review', [])

.factory 'Review', ['Restangular', (Rest)->
  Review = Rest.all('reviews')
  find: (id)->
    Rest.one('reviews', id)
  getByBusiness: (business_id)->
    Review.one('business', business_id)
  getByUser: (user_id)->
    Review.one('user', user_id)
  getByItemId: (item_id) ->
    Review.one('item', item_id)
  create: (data)->
    Review.post( data )
  destroy: (id)->
    Rest.one('review', id).remove()
]
