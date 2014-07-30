# /**
#  * Express configuration
#  */

'use strict'

express = require('express')
favicon = require('static-favicon')
morgan = require('morgan')
compression = require('compression')
bodyParser = require('body-parser')
methodOverride = require('method-override')
cookieParser = require('cookie-parser')
errorHandler = require('errorhandler')
path = require('path')
config = require('./environment')
passport = require('passport')
session = require('express-session')


module.exports = (app)->
  env = app.get('env')

  app.set('views', config.root + '/server/views')
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')
  app.use(compression())
  # // app.use(bodyParser())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(cookieParser())
  app.use(passport.initialize())

  # // Persist sessions with mongoStore
  # // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  # We need to configure the session store with our auth DB
  # app.use(session({
  #   secret: config.secrets.session,
  #   store: new mongoStore({
  #     url: config.mongo.uri,
  #     collection: 'sessions'
  #   }, () ->
  #       console.log('db connection open' )
  #   )
  # }))

  if 'production' is env
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')))
    app.use(express.static(path.join(config.root, 'public')))
    app.set('appPath', config.root + '/public')
    app.use(morgan('dev'))


  if 'development' is env or 'test' is env
    app.use(require('connect-livereload')())
    app.use(express.static(path.join(config.root, '.tmp')))
    app.use(express.static(path.join(config.root, 'client')))
    app.set('appPath', 'client')
    app.use(morgan('dev'))
    # // Error handler - has to be last
    app.use(errorHandler())
