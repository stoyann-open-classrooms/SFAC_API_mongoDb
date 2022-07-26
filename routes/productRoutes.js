const express = require('express')
const router = express.Router()

//controllers
const { getProducts, createProduct, getProduct, updateProduct, deleteProduct, upload } = require('../controllers/productController')


router.route('/').get(getProducts).post(upload, createProduct)

router
  .route('/:id')
  .get(getProduct)
  .put( updateProduct)
  .delete( deleteProduct)

module.exports = router
