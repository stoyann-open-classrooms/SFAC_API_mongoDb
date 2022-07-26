// ==== Dependances
const asyncHandler = require('express-async-handler')


// ==== Models
const Product = require('../models/Product');

// @ description GET all orders
//@routes  GET /api/v1/orders
//@access   Public


const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find()
  res
    .status(200)
    .json({ success: true, count: products.length, data: products })
})

// @ description GET single bootcamps
//@routes  GET /api/v1/bootcamps/:id
//@access   Public

const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  res.status(200).json({ success: true, data: product })
  if (!product) {
    return next(
      new ErrorResponse(`Order not found with id of ${req.params.id}`, 404),
    )
  }
})

// @ description  create new bootcamp
//@routes  POST /api/v1/bootcamps/:id
//@access   Private

const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    data: product,
  })
})

// @ description  update kanban
//@routes  PUT /api/v1/kanbans/:id
//@access   Private

const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) {
    return next(
      new ErrorResponse(`order not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: product })
})

// @ description  delete  new kanban
//@routes  DELETE /api/v1/kanbans/:id
//@access   Private

const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) {
    return next(
      new ErrorResponse(`order not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: {} })
})

module.exports = {
   getProduct,
   getProducts,
   createProduct, 
   deleteProduct,
   updateProduct
    
  }
  