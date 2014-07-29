db = require('../config/neo4j').db

Review = ()->
  @query = db.cypherQuery
Review.prototype.all = (callback)->
  q = "MATCH (i:Menu) RETURN i"
  @query( q, (err, result)->
    callback(err, result.data)
  )

Review.prototype.find = (review_id, callback)->
  params = {review_id: Number(review_id)}
  q = "START review=node({review_id})" +
          "MATCH (body:Body)<-[:BODY]-(review)-[:PHOTO]->(photo:Photo)" +
          "RETURN review, photo, body"
  @query( q, params, (err, result)->
    callback(err, result.data)
  )

Review.prototype.findByMenu = (menu_id, callback)->
  params =  {menu_id: Number(menu_id)}
  q = "START menu=node({menu_id}) "+
          "MATCH (menu)-[:HAS_ITEM]->(item:Item)," +
          "(item)-[:REVIEW]->(review:Review)," +
          "(item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo)," +
          "(review)-[:BODY]->(body:Body)" +
          "RETURN item, review, body, photo"
  @query( q, params, (err, result)->
    callback(err, result.data)
  )

Review.prototype.findByUser = (user_id, callback)->
  params = {user_id: Number(user_id)}
  q = "START user=node({user_id})" +
          'MATCH (user)-[:WROTE]->(review:Review)<-[:REVIEW]-(item:Item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo),' +
          "(review)-[:BODY]->(body:Body)" +
          "RETURN item, review, photo"
  @query( q, params, (err, result)->
    callback(err, result.data)
  )

Review.prototype.findByItem = (item_id, callback)->
  params = {item_id: Number(item_id)}
  q = "START item=node({item_id})" +
          "MATCH (item)-[:REVIEW]->(review:Review)" +
          "MATCH (body:Body)<-[:BODY]-(review)-[:PHOTO]->(photo:Photo)" +
          "RETURN item, review, photo, body"
  @query( q, params, (err, result)->
    callback(err, result.data)
  )

Review.prototype.create = (item_id, review, callback)->
  params = {item_id: Number(item_id), review:review}
  q = "START item=node({item_id})" +
          "CREATE (item)-[:REVIEW]->(review:Review {review})" +
          "CREATE (photo:Photo)<-[:PHOTO]-(review)-[:BODY]->(body:Body {text: 'I love this dish'})"
          "RETURN review, photo, body"
  @query( q, params (err, result)->
    callback(err, data)
  )

Review.prototype.update = (review_id, review, callback)->
  q = ""
  params = {review_id: review_id, changes:review}
  @query( q, params, (err, result)->
    callback(err, result.data)
  )

Review.prototype.destroy = (review_id, callback)->
  params = {review_id: Number review_id}
  q = "START review=node({review_id}) MATCH (review)-[r]-() DELETE review, r"
  @query( q, params, (err, result)->
    callback(err, data)
  )
