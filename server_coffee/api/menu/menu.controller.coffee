'use strict'

_ = require('lodash')
http = require('http')

# NEO4J API
db = require('../../config/neo4j').db

# LOCU API
Venue = require('../../config/api/locu').VenueClient

# FACTUAL API
factual = require('../../config/factual').factual

# YELP API
yelp = require('../../config/yelp').yelp

storeData = require('./storeData')

exports.index = (req, res)->
  db.cypherQuery( "MATCH (menu:Menu) RETURN menu", (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

base64_encode = (bitmap)->
  new Buffer(bitmap).toString('base64')


exports.getByLocation = (req, res)->
  data = {location:[req.body.lat,req.body.lng], radius: 500}
  if req.body.val then data.name = req.body.val
  console.log "Fuck Yelp", data
  Venue.search data, (response)->
    res.json(200, response.objects)
    console.log response

  # factual.get('/t/places/', {q:req.body.val, geo:{"$circle":{"$center":[req.body.lat,req.body.lng],"$meters":5000}}}
  # ,(err, result)->
  #   if err then return handleError(res, err)
  #   res.json(200, result.data)
  # )

# Get a single Business
# http://localhost:9000/api/menus/30
# working but must change HAS_ITEM to HAS to test
exports.show = (req, res)->
  params = {id: req.params.id}
  query = "Match (m:Menu) WHERE m.locu_id = {id} RETURN m"
  console.log "Fuck Yelp again"
  db.cypherQuery query, params, (err, result)->
    if err then throw err
    console.log "yes", result.data
    unless result.data.length
      Venue.get_details req.params.id, (response)->
        storeData.store response.objects[0], (data)->
          res.json(200, data)
    else
      res.json(200, result.data[0])
      # res.json(200, response.objects[0])


  # params = {menu:response.objects}
  # query = "START menu=node({id})" +
  #         "MATCH (menu)-[:HAS]->(item:Item)," +
  #         "(item)-[:REVIEW]->(review:Review)," +
  #         "(item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo)," +
  #         "(review)-[:BODY]->(body:Body)" +
  #         "RETURN item, review, body, photo"
  # db.cypherQuery(query, params, (err, result)->
  #   if err then return handleError(res, err)
  #   # unless result.data.length
  #   # console.log req.params.id
  #   res.json(201, "")
  # )

# Creates a new Business in the DB.
# http://localhost:9000/api/menus/
exports.create = (req, res)->
  query = "CREATE (menu:Menu {menu}) RETURN menu"
  menu = {
    factual_id : "0bf93772-75c7-4710-889d-9f407d612706",
    name: "Thai Gourmet Group",
    address: "845 Market Street",
    locality: "San Francisco",
    region: "CA",
    postcode: 94103,
    country: 'US',
    tel: '(415)-538-0800',
    latitude: 37.784268,
    longitude: -122.406917,
    website: 'http://www.leftyodouls.biz'
  }
  params = {menu: menu}
  db.cypherQuery(query, params, (err, result)->
    if err then return handleError(req, err)
    res.json(201, result.data)
  )

# // Updates an existing item in the DB.
exports.update = (req, res)->
  params = {}
  query = ""
  db.cypherQuery(query, params, (err, result)->
    if err then return handleError(req, err)
    res.json(201, result.data)
  )

# // Deletes a item from the DB.
exports.destroy = (req, res)->
  db.cypherQuery(query, params, (err, result)->
    if err then return handleError(req, err)
    res.json(201, result.data )
  )


handleError = (res, err)->
  res.send(500, err)
