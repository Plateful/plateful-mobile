# /**
#  * Main application file
#  */

# // Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

express = require('express')
config = require('./config/environment')

# // Populate DB with sample data
if config.seedDB then require('./config/seed')

# // Setup server
app = express()
server = require('http').createServer(app)

# configure socket.io
# socketio = require('socket.io').listen(server);
# require('./config/socketio')(socketio);

# Set config variables
require('./config/express')(app)
# app.use( require( './config/api/locu' ).testApi() )
# Set app api routes
require('./routes').applyRoutes(app)

require( './config/api/locu' ).testApi()

# // Start server
server.listen(config.port, config.ip, ()->
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
)

# // Expose app
exports = module.exports = app
