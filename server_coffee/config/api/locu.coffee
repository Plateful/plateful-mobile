
###### KEY is your API key, found on dev.locu.com
locu = require('locu')
db = require('../neo4j').db
VenueClient  = new locu.VenueClient('bc529b42f30999730cbb731ce191f536186dc1f5')
MenuClient = new locu.MenuItemClient('bc529b42f30999730cbb731ce191f536186dc1f5')
# MenuClient.search({ country: 'USA', name: 'burger', price__gte: 5, price__lt: 7}, (r)->
#     console.log(r)
# )

exports.testApi = ()->

  ###### Sample Data
  # getSampleVenus()
  # getMenuItemsPerMenu()
  # return



###### Fill your db with sample data of 25 venues
getSampleVenus = ()->

  MenuClient.search({
    category:'restaurant',
    locality: 'San Francisco'
  },
  (response)->
    # console.log blue_bottle = response.objects
    for obj in response.objects

      # Delete the id and restor it as locu_id NEO4J
      id = obj.id
      delete obj.id
      obj.locu_id = id

      ###### the Menu item comes with a venu
      # Create a menu param from the obj.venue
      # Delete the venue property off obj
      menu = obj.venue
      delete obj.venue

      params = {item: obj, menu:menu}
      query = "CREATE (m:Menu {menu})-[:HAS_ITEM]->(i:Item {item}) RETURN v,i"
      db.cypherQuery(query, params, (err, result)->
        if err then throw err
        console.log result.data
      )
  )


getMenuItemsPerMenu = ()->
  db.cypherQuery('MATCH (v:Venue) RETURN v', (err, result)->
    for obj in result.data
      params = {venu: obj.id}
      query = "START n=node({venue}) CREATE (m:Menu {menu})"


  )
