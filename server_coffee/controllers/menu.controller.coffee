'use strict'

_ = require('lodash')
http = require('http')

# NEO4J API
db = require('../config/neo4j').db

# LOCU API
Venue = require('../config/api/locu').VenueClient

# FACTUAL API
factual = require('../config/api/factual').factual

# YELP API
yelp = require('../config/api/yelp').yelp

storeData = require('./storeData')

# Menu Model
Menu = require('../models/Menu.model')

exports.index = (req, res)->
  Menu.all( (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

exports.getByLocation = (req, res)->
  data = {location:[req.body.lat,req.body.lng], radius: 500}
  if req.body.val then data.name = req.body.val
  console.log "Fuck Yelp", data
  Venue.search data, (response)->
    console.log response
    res.json(200, response.objects)


  # This comment below is for an api call to the Factual api.
  # Factual is much faster than the Venu (locu) api
  # We are using locu for menu data
  # Ask Joel Before changing
  # TODO: Configure google places on the front end to eliminate the need for api calls on restful routes
  #
  #
  #
  # factual.get('/t/places/', {q:req.body.val, geo:{"$circle":{"$center":[req.body.lat,req.body.lng],"$meters":5000}}}
  # ,(err, result)->
  #   if err then return handleError(res, err)
  #   res.json(200, result.data)
  # )

# Get a single Business
# http://localhost:9000/api/menus/30
# working but must change HAS_ITEM to HAS to test
exports.show = (req, res)->
  Menu.find( (err, data)->
    if err then return handleError(res, err)
    unless data.length
      Venue.get_details req.params.id, (response)->
        storeData.store response.objects[0], (data)->
          res.json(200, data)
    else
      res.json(200, data[0])
  )


# Creates a new Business in the DB.
# http://localhost:9000/api/menus/
exports.create = (req, res)->
  Menu.create(req.body.menu, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

# // Updates an existing item in the DB.
exports.update = (req, res)->
  Menu.update(req.params.id, req.body, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

# // Deletes a item from the DB.
exports.destroy = (req, res)->
  Menu.destroy(req.params.id, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data )
  )


# Use this to handle errors
handleError = (res, err)->
  res.send(500, err)

# For bitmapping images as they come in
base64_encode = (bitmap)->
  new Buffer(bitmap).toString('base64')
