'use strict'

express = require('express')
controller = require('./review.controller')

router = express.Router()

router.get('/', controller.index)
router.get('/business/:business_id', controller.getByBusiness)
router.get('/user/:user_id', controller.getByUser)
router.get('/item/:item_id', controller.getByItem)
router.get('/:id', controller.show)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.patch('/:id', controller.update)
router.delete('/:id', controller.destroy)



module.exports = router
