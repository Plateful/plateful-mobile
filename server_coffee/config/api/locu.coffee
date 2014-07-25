
###### KEY is your API key, found on dev.locu.com
locu = require('locu')
db = require('../neo4j').db
fs = require('fs')
# VenueClient  = new locu.VenueClient('bc529b42f30999730cbb731ce191f536186dc1f5')

module.exports.VenueClient = VenueClient = new locu.VenueClient('bc529b42f30999730cbb731ce191f536186dc1f5')
module.exports.MenuClient = MenuClient = new locu.MenuItemClient('bc529b42f30999730cbb731ce191f536186dc1f5')


# MenuClient = new locu.MenuItemClient('008003c4e23690e926438790cbd3435c78af659e')
# MenuClient.search({ country: 'USA', name: 'burger', price__gte: 5, price__lt: 7}, (r)->
#     console.log(r)
# )

exports.testApi = ()->

  ###### Sample Data
  # getSampleVenus()
  # getMenuItemsPerMenu()

###### Fill your db with sample data of 25 venues
getSampleVenus = ()->

  VenueClient.search({
    has_menu: true,
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
      # menu = obj.venue
      # delete obj.venue

      params =  {menu:obj}
      query = "CREATE (m:Menu {menu}) RETURN m"
      db.cypherQuery(query, params, (err, result)->
        if err then throw err
        console.log result.data
      )
  )


getMenuItemsPerMenu = ()->
  db.cypherQuery 'Match (m:Menu) RETURN m', (err, neo)->
    ids = []
    # console.log neo
    for item in neo.data
      # console.log item.locu_id
      VenueClient.get_details(item.locu_id, (result)->
        console.log result.objects[0]
        fs.appendFile(
          './menu.txt',
          "@$@locu_id #{result.objects[0].id}, \n#{JSON.stringify(result.objects[0])}\n\n",
          (err)->
            if err then throw err
            console.log('The "data to append" was appended to file!')  ))
