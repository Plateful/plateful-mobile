db = require('../config/neo4j').db


Menu = ()->
  @query = db.cypherQuery

Menu.prototype.all = (callback)->
  q = "MATCH (menu:Menu) RETURN menu"
  @query(q, (err, result)->

    callback(err, result.data)
  )

Menu.prototype.find = (menu_id, callback)->
  params = {menu_id: menu_id}
  q = "Match (m:Menu) WHERE m.locu_id = {menu_id} RETURN m"
  @query(q, params, (err, result)->
    callback(err, result.data)
  )


Menu.prototype.create = (menu, callback)->
  q = "CREATE (menu:Menu {menu}) RETURN menu"
  params = {menu: menu}
  @query(q, params, (err, result)->

    callback(err, result.data)
  )

Menu.prototype.update = (menu_id, menu, callback)->
  params = {menu_id:menu_id, changes:menu}
  q = ""
  @query(q, params, (err, result)->
    callback(err, result.data)
  )

Menu.prototype.destroy = (menu_id, callback)->
  params = {menu_id:menu_id}
  q = ""
  db.cypherQuery(q, params, (err, result)->
    callback(err, result.data)
  )
