const express = require('express')
const router = express.Router({mergeParams: true})

//controllers
const { getProducts, createProduct, getProduct, updateProduct, deleteProduct, upload } = require('../controllers/productController')
const orderRouter = require('./orderRoutes')

// Re-Routes into order router
router.use('/:productId/orders', orderRouter)
router.route('/').get(getProducts).post(upload, createProduct)

router
  .route('/:id')
  .get(getProduct)
  .put( updateProduct)
  .delete( deleteProduct)

module.exports = router
