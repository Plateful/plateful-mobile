db = require('../config/neo4j').db
_ = require('underscore')

###### HERE we will take the passed in data and store it in NEO4J
# Format the data before passing it into NEO4J
# This File is being used by the api/menus/show route (controller.show)




module.exports.store = (business, callback)->


  ###### Store the id in a property call Locu_id and remove the id property

  locu_id = business.id
  delete business.id
  business.locu_id = locu_id


  ###### Store the menu items array for iteration on callback

  menus = business.menus


  ###### NEO4J cannot take primitive object types or null values. Remove each

  for key of business
    if business[key] is null then delete business[key]
    if typeof business[key] is 'object' then delete business[key]


  # Set the params to pass into the cypherQuery
  params = {menu:business}

  # Create the query string
  query = "CREATE (m:Menu {menu}) RETURN m"

  # Call the cypherQuery function, passing in the parameters and the query string
  db.cypherQuery query, params, (err, result)->
    if err then return throw err
    console.log "Data was stored", result.data[0]._id

    #####
    #    After storing the data, NEO4J returns the created node with an _id property
    #
    #    The _id property is used to CREATE a MATCH and/or EDGE from the menu to each of it's items
    #####

    StoreMenus(menus, result.data[0]._id)

    # Call the passed in callback function
    # The callback will retrieve the data in the menu.controller form the exports.show function

    callback(result.data[0])


StoreMenus = (item, menu_id)->
  #   @param item
  #   /An array of deeply nested arrays and objects
  #
  #   @item.type === "ITEM"
  #   /Find all the objects with a key/value pair type : "ITEM"
  #   /Store the foud object with a property type = "ITEM" in  NEO4J


  ###### giveToNeo

  # Create a new Item in the database
  # Create a gallery node
  # Match the the Menu to the item using the passed in menu_id
  # Match the item to the gallery

  giveToNeo = (item, menu_id)->
    menuParams = {menu_id: menu_id, item:item}
    menuQuery = "START m=node({menu_id}) CREATE (m)-[:HAS_ITEM]->(i:Item {item})-[:GALLERY]->(g:Gallery) RETURN i"
    db.cypherQuery menuQuery, menuParams, (err, result)->

      if err then return throw err

      console.log "Item #{result.data[0]._id}, #{result.data[0].name} was sucessfully Stored"



  ###### findMenuItems
  # Using recursion loop through the Array of Objects in order to find


  findMenuItems = (item, param, val)->
    result = []
    search = (item)->
      _.each(item, (el, pos, item)->
        if typeof el is 'object'
          search(el)

        if el is val and pos is param
          result.push(item)
      )
    search(item)
    return result

  items = findMenuItems(item, 'type', 'ITEM')


  ###### Loop through the items array and call giveToNeo
  # pass in the menu_id in order to match the item to the menu

  for key in items
    delete key.option_groups
    delete key.type
    console.log key
    giveToNeo(key, menu_id)
