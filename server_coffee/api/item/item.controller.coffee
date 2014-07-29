'use strict'

_ = require('lodash')
db = require('../../config/neo4j').db
MenuClient = require('../../config/api/locu').MenuClient


# TODO: Google api information. Joel will rove this soon
exports.apiKey = apiKey = "AIzaSyCB0Ac877CMP3MyZ9gtw4z8Ht4i7yjGx0w";
exports.outputFormat = outputFormat = "json";



# complete
exports.index = (req, res)->
  query = "MATCH (m:Item) RETURN m"
  db.cypherQuery( query, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )

# GET http://localhost:9000/api/items/business/30
# working (must change the connection from :HAS_ITEM to :HAS)
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

# GET http://localhost:9000/api/items/user/28
# working
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

exports.getByLocation = (req, res)->
  console.log 'yolo'
  data = {location: [req.body.lat, req.body.lng]}
  if req.body.val then data.name = req.body.val
  MenuClient.search data, (response)->
    console.log response.objects
    res.json(200, response.objects)


  # The code below is a snippet for the eventual query to neo
  #
  #
  # query = ""
  # params = ""
  # db.cypherQuery( query, params, (err, result)->
  #   if err then return handleError(res, err)
  #   res.json(201, result.data)
  # )



# GET single item http://localhost:9000/api/items/35
# working
exports.show = (req, res)->
  # Check NEO4J if the item exhists
    # if not then search Locu Menu Details for menu item


  params = {id: Number(req.params.id)}
  query = "START item=node({id})" +
          "MATCH (item)-[:REVIEW]->(review:Review)-[:BODY]->(body:Body), " +
          "(review)-[:PHOTO]->(photo:Photo)" +
          "RETURN item, review, photo, body"
  db.cypherQuery('MATCH (n) WHERE id(n) = {id} RETURN n', (err, result)->
    if err then return handleError(res, err)
    res.json(200, result.data)
  )

# POST http://localhost:9000/api/items/
# Working but need to make changes to the neo4j queries takes in data
exports.create = (req, res)->
  query = "START menu=node(7)" +
          "CREATE (item:Item { name: 'Rice cake', description: 'Rice Cake with Chicken Stock'})"
          "(menu)-[:HAS_ITEM]->(item)" +
          "RETURN item"
  db.cypherQuery( query, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )


# PUT http://localhost:9000/api/items/11
#working but need changes to only added the changes to one property instead of over writing the whole thing
exports.update = (req, res)->
  params = {changes:req.body, id:req.params.id}
  query = "START item=node({id}) SET item = {changes} RETURN item"
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )




exports.destroy = (req, res)->
  params = {id: Number req.params.id}
  query = "START item=node({id}) MATCH (item)-[r]-() DELETE item, r"
  db.cypherQuery( query, params, (err, result)->
    if err then return handleError(res, err)
    res.json(201, result.data)
  )


handleError = (res, err)->
  return res.send(500, err)
