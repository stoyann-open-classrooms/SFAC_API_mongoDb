// ==== Dependances
const asyncHandler = require('express-async-handler')


// ==== Models
const Request = require('../models/Request');

// @ description GET all orders
//@routes  GET /api/v1/orders
//@access   Public


const getRequests = asyncHandler(async (req, res, next) => {
  const requests = await Request.find(req.query)
  res
    .status(200)
    .json({ success: true, count: requests.length, data: requests })
})

// @ description GET single bootcamps
//@routes  GET /api/v1/bootcamps/:id
//@access   Public

const getRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id)
  res.status(200).json({ success: true, data: request })
  if (!request) {
    return next(
      new ErrorResponse(`Request not found with id of ${req.params.id}`, 404),
    )
  }
})

// @ description  create new bootcamp
//@routes  POST /api/v1/bootcamps/:id
//@access   Private

const createRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.create(req.body)
  res.status(201).json({
    success: true,
    data: request,
  })
})

// @ description  update kanban
//@routes  PUT /api/v1/kanbans/:id
//@access   Private

const updateRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!request) {
    return next(
      new ErrorResponse(`order not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: request })
})

// @ description  delete  new kanban
//@routes  DELETE /api/v1/kanbans/:id
//@access   Private

const deleteRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findByIdAndDelete(req.params.id)
  if (!request) {
    return next(
      new ErrorResponse(`Request not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: {} })
})

module.exports = {
   getRequest,
   getRequests,
   createRequest, 
   deleteRequest,
   updateRequest
    
  }
  