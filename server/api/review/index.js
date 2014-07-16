'use strict';

var express = require('express');
var controller = require('./review.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/business/:business_id', controller.getByBusiness);
router.get('/user/:user_id', controller.getByUser);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
