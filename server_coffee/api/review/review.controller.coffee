'use strict'

_ = require('lodash')
busboy = require('connect-busboy')
fs = require('fs')

# NEO4J API
db = require('../../config/neo4j').db

# FACTUAL API
factual = require('../../config/api/factual').factual

# YELP API
yelp = require('../../config/api/yelp').yelp


exports.index = (req, res)->
  query = "MATCH (i:Menu) RETURN i"
  db.cypherQuery( query, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

exports.getByBusiness = (req, res)->
  params =  {menu: Number(req.params.business_id)}
  query = "START menu=node({menu}) "+
          "MATCH (menu)-[:HAS_ITEM]->(item:Item)," +
          "(item)-[:REVIEW]->(review:Review)," +
          "(item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo)," +
          "(review)-[:BODY]->(body:Body)" +
          "RETURN item, review, body, photo"
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )


# working
# GET http://localhost:9000/api/reviews/user/28
exports.getByUser = (req, res)->
  params = {user: Number(req.params.user_id)}
  query = "START user=node({user})" +
          'MATCH (user)-[:WROTE]->(review:Review)<-[:REVIEW]-(item:Item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo),' +
          "(review)-[:BODY]->(body:Body)" +
          "RETURN item, review, photo"
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

# http://localhost:9000/api/reviews/item/13
# working
exports.getByItem = (req, res)->
  params = {id: Number(req.params.item_id)}
  query = "START item=node({id})" +
          "MATCH (item)-[:REVIEW]->(review:Review)" +
          "MATCH (body:Body)<-[:BODY]-(review)-[:PHOTO]->(photo:Photo)" +
          "RETURN item, review, photo, body"
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

# http://localhost:9000/api/reviews/128
exports.show = (req, res)->
  params = {review_id: Number(req.params.id)}
  query = "START review=node({review_id})" +
          "MATCH (body:Body)<-[:BODY]-(review)-[:PHOTO]->(photo:Photo)" +
          "RETURN review, photo, body"
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

exports.create = (req, res)->
  params = {item_id: Number(req.params.id)}
  query = "START item=node({item_id})" +
          "CREATE (item)-[:REVIEW]->(review:Review { star: '5'})" +
          "CREATE (photo:Photo)<-[:PHOTO]-(review)-[:BODY]->(body:Body {text: 'I love this dish'})"
          "RETURN review, photo, body"
  db.cypherQuery( query, (err, result)->
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
  params = {id: Number req.params.id}
  query = "START review=node({id}) MATCH (review)-[r]-() DELETE review, r"
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

handleError = (res, err)->
  return res.send(500, err)
