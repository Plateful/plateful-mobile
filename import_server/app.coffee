###
#  * Main application file
#  This Server is a start up template server.
#  Use this for data processing logic
#
#
#
###

# // Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

express = require('express')

config = require('./config/environment')


# // Setup server
app = express()
server = require('http').createServer(app)


# Set config variables
require('./config/express')(app)
# app.use( require( './config/api/locu' ).testApi() )
# Set app api routes
# require('./routes').applyRoutes(app)


# // Start server
server.listen(config.port, config.ip, ()->
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
)

# // Expose app
exports = module.exports = app
