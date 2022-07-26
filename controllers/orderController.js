// ==== Dependances
const asyncHandler = require('express-async-handler')

// ==== Models
const Order = require('../models/Order')

// @ description GET all orders
//@routes  GET kanban/api/v1/orders
//@access   Public

const getOrders = asyncHandler(async (req, res, next) => {
 console.log(req.query);
  const orders = await Order.find(req.query)
  res.status(200).json({ success: true, count: orders.length, data: orders })
})

// @ description GET single order
//@routes  GET kanban/api/v1/orders/:id
//@access   Public

const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  res.status(200).json({ success: true, data: order })
  if (!order) {
    return next(
      new ErrorResponse(`Order not found with id of ${req.params.id}`, 404),
    )
  }
})

// @ description  create new order
//@routes  POST kanban/api/v1/orders/:id
//@access   Private

const createOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.create(req.body)
  res.status(201).json({
    success: true,
    data: order,
  })
})

// @ description  update order
//@routes  PUT  kanban/api/v1/orders/:id
//@access   Private

const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!order) {
    return next(
      new ErrorResponse(`order not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: order })
})

// @ description  delete order
//@routes  DELETE  kanban/api/v1/orders/:id
//@access   Private

const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id)
  if (!order) {
    return next(
      new ErrorResponse(`order not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: {} })
})

module.exports = {
  getOrder,
  getOrders,
  createOrder,
  deleteOrder,
  updateOrder,
}
