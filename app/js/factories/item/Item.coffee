angular.module('app.factory.item', [])




.factory 'MenuItem', [ 'Restangular', (Rest)->
  Item = Rest.all('items')
  storage = {}
  findFilter = ""
  get: ()->
    Item
  find: (id)->
    Rest.one('items', id)
  getByLocation: (data, cb, filter)->
    # if filter then set the global filter to its value
    if filter then findFilter = filter
    # if filter is "empty" set the global filter to ""
    if filter is "empty" then findFilter = ""
    # set the search value on data before sending to the server
    data.val = findFilter
    # url: POST - api/businesses/location
    Item.all('location').post(data).then (result)->
      cb(result, findFilter)


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

  set: (key, obj)->
    storage[key] = obj

  getStorage: (key)->
    if key then return storage[key]
    return storage

  create: (data)->
    Item.post( data )
  destroy: (id)->
    Rest.one('items', id).remove()

]
