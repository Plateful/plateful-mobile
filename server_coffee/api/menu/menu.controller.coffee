'use strict'

_ = require('lodash')
http = require('http')

# NEO4J API
db = require('../../config/neo4j').db

# FACTUAL API
factual = require('../../config/factual').factual

# YELP API
yelp = require('../../config/yelp').yelp

exports.index = (req, res)->
  query = ""
  params = ""
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )


base64_encode = (bitmap)->
  new Buffer(bitmap).toString('base64')


exports.getByLocation = (req, res)->
  factual.get('/t/places/', {q:req.body.val, geo:{"$circle":{"$center":[req.body.lat,req.body.lng],"$meters":5000}}}
  ,(err, result)->
    if err then return handleError(req, err)
    res.json(200, result.data)
  )

# // Get a single Business
exports.show = (req, res)->
  params = {}
  query = ""
  db.cypherQuery(query, params, (err, result)->
    if err then return handleError(req, err)
    res.json(201, result.data)
  )

# // Creates a new Business in the DB.
exports.create = (req, res)->
  params = {}
  query = ""
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
  params = {}
  query = ""
  db.cypherQuery(query, params, (err, result)->
    if err then return handleError(req, err)
    res.json(201, result.data )
  )


handleError = (res, err)->
  res.send(500, err)
