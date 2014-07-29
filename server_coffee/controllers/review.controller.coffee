'use strict'

_ = require('lodash')
busboy = require('connect-busboy')
fs = require('fs')

# NEO4J API
db = require('../config/neo4j').db

# FACTUAL API
factual = require('../config/api/factual').factual

# YELP API
yelp = require('../config/api/yelp').yelp

# Review Model
Review = require('../models/Review.model')

exports.index = (req, res)->
  Review.all( (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

# GET http://localhost:9000/api/reviews/business/:menu_id
exports.getByMenu = (req, res)->
  Review.findByMenu(req.params.menu_id, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )


# working
# GET http://localhost:9000/api/reviews/user/:user_id
exports.getByUser = (req, res)->
  Review.findByUser( query, params, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

# GET http://localhost:9000/api/reviews/item/:item_id
# working
exports.getByItem = (req, res)->
  Review.findByItem(req.params.item_id, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

# GET http://localhost:9000/api/reviews/:id
exports.show = (req, res)->
  Review.find(req.params.id, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

# POST http://localhost:9000/api/reviews
exports.create = (req, res)->
  Review.create(req.body.item_id, req.body.review, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

# PUT http://localhost:9000/api/reviews/:id
exports.update = (req, res)->
  Review.update(req.params.id, req.body.review, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

exports.destroy = (req, res)->
  Review.destroy(req.params.id, (err, data)->
    if err then return handleError(res, err)
    res.json(201, data)
  )

handleError = (res, err)->
  return res.send(500, err)
