angular.module "app"

# A simple controller that shows a tapped item's data
.controller "PetDetailCtrl", ($scope, $stateParams, PetService) ->
  $scope.pet = PetService.get($stateParams.petId)


# 
#
# class @BaseCtrl
#   # @register: (app, name) ->
#   #   name ?= @name || @toString().match(/function\s*(.*?)\(/)?[1]
#   #   app.controller name, @
#
#   @inject: (args...) ->
#     @$inject = args
#
#   constructor: (args...) ->
#
#     for key, index in @constructor.$inject
#       @[key] = args[index]
#
#     for key, fn of @constructor.prototype
#       continue unless typeof fn is 'function'
#       continue if key in ['constructor', 'initialize'] or key[0] is '_'
#       @$scope[key] = fn.bind?(@) || _.bind(fn, @)
#
#     @initialize?()
#

#
# class ItemsCtrl extends BaseCtrl
#
#   @inject '$scope', '$ionicModal', 'MenuItem', 'Menu', 'ImagesService'
#
#   initialize: ()->
#     @locate = window.currLocation.coords
#     @images = @ImagesService.get()
#     @locationData = {lat: @locate.latitude,lng: @locate.longitude}
#
#     @checkCache()
#
#     @MenuItem.getByLocation(@locationData, null)
#       .then (data)=>
#         @items = data
#         @setDummyImages()
#         @findDistance()
#         console.log @
#         console.log @$scope
#
#   querySearch: (itemsFilter)->
#     itemsFilter = itemsFilter or "empty"
#     @MenuItem.getByLocation(@locationData, itemsFilter)
#       .then (data)=>
#         # @findFilter = key
#         @items = newData
#         @setDummyImages()
#         @findDistance()
#
#
#   checkCache: ()->
#     @items = @MenuItem.getStorage()
#
#
#   findDistance: ()->
#     from = new google.maps.LatLng(@locate.latitude, @locate.longitude)
#     for item in @items
#       to   = new google.maps.LatLng(item.venue.lat, item.venue.long)
#       dist = google.maps.geometry.spherical.computeDistanceBetween(from, to) * 0.000621371192
#       item.dist = dist - dist % 0.001
#
#   setDummyImages: ()->
#     for item in @items
#       item.image_url = @images[Math.floor(Math.random() * @images.length)]
#
# angular
#   .module('app')
#   .controller 'ItemsCtrl', ItemsCtrl
#
