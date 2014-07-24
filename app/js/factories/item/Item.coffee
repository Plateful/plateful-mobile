angular.module('clurtch.factory.item', [])

.factory 'MenuItem', [ 'Restangular', (Rest)->
  Item = Rest.all('items')
  get: ()->
    Item
  getByLocation: (location)->
    Item.all('location').post(location)
  getByBusiness: (business_id)->
    Item.one('business', business_id)
  getByUser: (user_id)->
    Item.one('user', user_id)
  find: (id)->
    Rest.one('items', id)
  create: (data)->
    Item.post( data )
  destroy: (id)->
    Rest.one('items', id).remove()

]
