'use strict'

_ = require('lodash')
MenuClient = require('../config/api/locu').MenuClient

Item = require('../models/Item.model')

# TODO: Google api information. Joel will remove this soon
exports.apiKey = apiKey = "AIzaSyCB0Ac877CMP3MyZ9gtw4z8Ht4i7yjGx0w";
exports.outputFormat = outputFormat = "json";



# complete
exports.index = (req, res)->
  Item.all( (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

# GET http://localhost:9000/api/items/business/:menu_id
# working (must change the connection from :HAS_ITEM to :HAS)
exports.getByMenu = (req, res)->
  Item.findByMenu( req.params.menu_id, (err, data)->
    if err then return handleError(res, err)
    res.json(200, data)
  )


# GET http://localhost:9000/api/items/user/:user_id
# working
exports.getByUser = (req, res)->
  Item.findByUser( req.params.user_id, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

# GET http://localhost:9000/api/items/location
exports.getByLocation = (req, res)->
  console.log 'yolo'
  data = {location: [req.body.lat, req.body.lng]}
  if req.body.val then data.name = req.body.val
  MenuClient.search( data, (response)->
    console.log response.objects
    res.json(200, response.objects)
  )

  # Item.findByLocation( req.body, (err, data)->
  #   if err then return handleError(res, err)
  #   res.json(200, data)
  # )



# GET single item http://localhost:9000/api/items/:id
# working
exports.show = (req, res)->

  Item.find( req.params.id, (err, data)->
    if err then return handleError(res, err)
    res.json(200, data)
  )


# POST http://localhost:9000/api/items/
# Working but need to make changes to the neo4j queries takes in data
exports.create = (req, res)->
  Item.create(req.body.menu_id, req.body.item, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )


# PUT http://localhost:9000/api/items/:id
#working but need changes to only added the changes to one property instead of over writing the whole thing
exports.update = (req, res)->
  Item.update( req.params.id, req.body, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

# DELETE http://localhost:9000/api/items/:id
exports.destroy = (req, res)->
  Item.destroy( req.params.id, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )


handleError = (res, err)->
  return res.send(500, err)
