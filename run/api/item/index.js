(function() {
  'use strict';
  var controller, express, router;

  express = require('express');

  controller = require('./item.controller');

  router = express.Router();

  router.get('/', controller.index);

  router.get('/business/:business_id', controller.getByBusiness);

  router.post('/location', controller.getByLocation);

  router.get('/user/:user_id', controller.getByUser);

  router.get('/:id', controller.show);

  router.post('/', controller.create);

  router.put('/:id', controller.update);

  router.patch('/:id', controller.update);

  router["delete"]('/:id', controller.destroy);

  module.exports = router;

}).call(this);
