'use strict'

_ = require('lodash')
busboy = require('connect-busboy')
fs = require('fs')

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

exports.getByBusiness = (req, res)->
  query = ""
  params = ""
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )



exports.getByUser = (req, res)->
  query = ""
  params = ""
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )



exports.getByItem = (req, res)->
  query = ""
  params = ""
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

exports.show = (req, res)->
  query = ""
  params = ""
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

exports.create = (req, res)->
  query = ""
  params = ""
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

exports.update = (req, res)->
  query = ""
  params = ""
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

exports.destroy = (req, res)->
  query = ""
  params = ""
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

handleError = (res, err)->
  return res.send(500, err)
