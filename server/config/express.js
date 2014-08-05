(function() {
  'use strict';
  var bodyParser, compression, config, cookieParser, errorHandler, express, favicon, methodOverride, morgan, passport, path, session;

  express = require('express');

  favicon = require('static-favicon');

  morgan = require('morgan');

  compression = require('compression');

  bodyParser = require('body-parser');

  methodOverride = require('method-override');

  cookieParser = require('cookie-parser');

  errorHandler = require('errorhandler');

  path = require('path');

  config = require('./environment');

  passport = require('passport');

  session = require('express-session');

  module.exports = function(app) {
    var env;
    env = app.get('env');
    app.set('views', config.root + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(compression());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());
    if ('production' === env) {
      app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
      app.use(express["static"](path.join(config.root, 'public')));
      app.set('appPath', config.root + '/public');
      app.use(morgan('dev'));
    }
    if ('development' === env || 'test' === env) {
      app.use(require('connect-livereload')());
      app.use(express["static"](path.join(config.root, '.tmp')));
      app.use(express["static"](path.join(config.root, 'client')));
      app.set('appPath', 'client');
      app.use(morgan('dev'));
      return app.use(errorHandler());
    }
  };

}).call(this);
