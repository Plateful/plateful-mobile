angular.module('clurtch.factory.item', [])

.factory 'MenuItem', [ 'Restangular', (Rest)->
  Item = Rest.all('items')
  get: ()->
    Item
  find: (id)->
    Rest.one('items', id)
  getByLocation: (location)->
    Item.all('location').post(location)
  getByBusiness: (business_id)->
    Item.one('business', business_id)
  getByUser: (user_id)->
    Item.one('user', user_id)
  getItemReviews: (item_id, cb)->
    # api/item/item_id/essay
    Rest.one('item', item_id).all('essay').get()
  getItemGallery: (item_id, cb)->
    # api/item/item_id/gallery
    Rest.one('item', item_id).all('gallery').get()
  

  create: (data)->
    Item.post( data )
  destroy: (id)->
    Rest.one('items', id).remove()

]
