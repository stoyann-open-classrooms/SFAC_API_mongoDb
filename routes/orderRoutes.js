const express = require('express')
const router = express.Router()

//controllers
const { createOrder, getOrders, getOrder, updateOrder } = require('../controllers/orderController')



router.route('/').get(getOrders).post( createOrder)
router
  .route('/:id')
  .get(getOrder)
  .put( updateOrder)
  .delete( deleteOrder)

module.exports = router
