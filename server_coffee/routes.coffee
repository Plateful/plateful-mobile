# /**
#  * Main application routes
#  */
errors = require('./components/errors')
cors = require('cors')
busboy = require('connect-busboy')

module.exports.applyRoutes = (app)->

  app.use(cors())
  app.use(busboy({ immediate: true }))

  # Insert routes below
  app.use('/api/reviews', require('./api/review'))
  app.use('/api/items', require('./api/item'))
  app.use('/api/menus', require('./api/menu'))

  # All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404])

  #  All other routes should redirect to the index.html
  app.route('/*')
    .get( (req, res)->
      res.sendfile(app.get('appPath') + '/index.html')
    )
