# /**
#  * Main application file
#  */
# //53c5cf5c80a3c64a2669c8da


# // Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

express = require('express');



# // Setup server
app = express();
server = require('http').createServer(app);


# // require('./config/express')(app);


# // require('./routes').applyRoutes(app);



# // Start server
server.listen(9000, '127.0.0.1', ()->
  console.log('Express server listening on %d, in %s mode', 9000)
)

# // Expose app
exports = module.exports = app
