(->
  ###*
   * @name    MenuItem
   * @param   {Service} Restangular Restangular provider
   * @return  {Object} returns an object with all given methods
  ###
  MenuItem = (Restangular, $q, findDistance, makeStars, ImagesService)->


    Rest = Restangular.all('items')
    storage = {}
    findFilter = ""

    get: ()->
      Rest.getList()
    find: (id)->
      # return 15
      Restangular.one('items', id).get()
    getByMenu: (menu_id)->
      Rest.one('menu', menu_id).get()
    getByUser: (user_id)->
      Rest.one('user', user_id).get()
    getItemReviews: (item_id, cb)->
      Restangular.one('item', item_id).all('essay').get()
    getItemGallery: (item_id, cb)->
      Restangular.one('item', item_id).all('gallery').get()
    getByLocation: (data, filter)->
      newPromise = $q.defer()

      if filter then findFilter = filter
      if filter is "empty" then findFilter = ""
      data.val = findFilter

      Rest.all('location').post(data)
        .then (data)->
          for item in data
            item.dist = findDistance.get(item)
            item.stars = makeStars.set(item)
            item.image_url = ImagesService.get()

          newPromise.resolve(data)

      return newPromise.promise

    set: (key, obj)->
      storage[key] = obj
    getStorage: (key)->
      if key then return storage[key]
      return storage
    create: (data)->
      Rest.post( data )
    destroy: (id)->
      Restangular.one('items', id).remove()

  MenuItem.$inject = ['Restangular', '$q', 'findDistance', 'makeStars', 'ImagesService']
  angular
    .module('app.factory.item', [])
    .factory('MenuItem', MenuItem)
)()
