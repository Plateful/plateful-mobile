/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var cors = require('cors');
var busboy = require('connect-busboy');




module.exports.applyRoutes = function(app) {

  app.use(cors())
  app.use(busboy({ immediate: true }));
  // app.use(function(req, res, next) {
  //   req.busboy.on('field', function(fieldname, val) {
  //    // console.log(fieldname, val);
  //     req.body[fieldname] = val;
  //   });
  //
  //   req.busboy.on('finish', function(){
  //    next();
  //   });
  // });
  // Insert routes below
  app.use('/api/reviews', require('./api/review'));
  app.use('/api/items', require('./api/item'));
  app.use('/api/businesses', require('./api/business'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
