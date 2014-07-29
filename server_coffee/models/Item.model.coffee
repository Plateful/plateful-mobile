db = require('../config/neo4j').db

Item = ->
  @query = db.cypherQuery


Item.prototype.all = (callback)->
  query = "MATCH (m:Item) RETURN m"
  @query( query, (err, result)->
    callback(err, result.data)
  )

Item.prototype.find = (item_id, callback)->
  params = {id: Number(item_id)}
  query = "START item=node({id})" +
          "MATCH (item)-[:REVIEW]->(review:Review)-[:BODY]->(body:Body), " +
          "(review)-[:PHOTO]->(photo:Photo)" +
          "RETURN item, review, photo, body"
  @query('MATCH (n) WHERE id(n) = {id} RETURN n', (err, result)->

    callback(err, result.data)
  )


Item.prototype.findByMenu = (menu_id, callback)->
  params =  {menu: Number(menu_id)}
  query = "START menu=node({menu}) "+
          "MATCH (menu)-[:HAS_ITEM]->(item:Item)," +
          "(item)-[:REVIEW]->(review:Review)," +
          "(item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo)," +
          "(review)-[:BODY]->(body:Body)" +
          "RETURN item, review, body, photo"
  @query( query, params, (err, result)->
    callback(err, result.data)
  )
Item.prototype.findByUser = (user_id, callback)->
  params = {user: Number(user_id)}
  query = "START user=node({user})" +
          'MATCH (user)-[:WROTE]->(review:Review)<-[:REVIEW]-(item:Item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo),' +
          "(review)-[:BODY]->(body:Body)" +
          "RETURN item, review, photo"
  @query( query, params, (err, result)->

    callback(err, result.data)
  )

Item.prototype.findByLocation = (data, callback)->
  # The code below is a snippet for the eventual query to neo

  query = ""
  params = ""
  @query( query, params, (err, result)->

    callback(err, result.data)
  )

Item.prototype.findWhere = ()->

Item.prototype.findWith = ()->

Item.prototype.create = (menu_id, item, callback)->
  params = {menu_id: menu_id, item:item}
  query = "START menu=node({menu_id})" +
          "CREATE (item:Item {item})"
          "(menu)-[:HAS_ITEM]->(item)" +
          "RETURN item"
  @query( query, params, (err, result)->

    callback(err, result.data)
  )


Item.prototype.update = (item_id, item, callback)->
  params = {changes:item, id:item_id}
  query = "START item=node({id}) SET item = {changes} RETURN item"
  @query( query, params, (err, result)->

    callback(err, result.data)
  )

Item.prototype.destroy = (item_id, callback)->
  params = {id: Number(item_id)}
  query = "START item=node({id}) MATCH (item)-[r]-() DELETE item, r"
  @query( query, params, (err, result)->

    callback(err, result.data)
  )


module.exports = new Item()
