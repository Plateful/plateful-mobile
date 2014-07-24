'use strict'

_ = require('lodash')
db = require('../../config/neo4j').db


exports.index = (req, res)->
  query = ""
  params = ""
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

exports.getByBusiness = (req, res)->
  business_id = req.params.business_id
  params = {business:req.params.business_id}
  query = "START b=node({business}) MATCH (b)-[:]->(d:Dish), (b)"

  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

exports.getByUser = (req, res)->
  user_id = req.params.user_id
  query = ""
  params = ""
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

exports.getByLocation = (req, res)->
  query = ""
  params = ""
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

exports.show = (req, res)->
  console.log(req.params.id)
  db.cypherQuery('MATCH (n) WHERE id(n) = '+req.params.id+' RETURN n', (err, result)->
    if err then return handleError(res, err)    
    res.json(200, result.data)
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
