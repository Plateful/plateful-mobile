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
    app.use(compression());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    return app.use(errorHandler());
  };

}).call(this);
