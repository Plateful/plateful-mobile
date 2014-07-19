'use strict';

var express = require('express');
var controller = require('./business.controller');

var router = express.Router();
// api/businesses
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/location', controller.getByLocation);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
