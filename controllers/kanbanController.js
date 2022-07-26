// ==== Dependances
const asyncHandler = require('express-async-handler')


// ==== Models
const Kanban = require('../models/Kanban');

// @ description GET all kanban
//@routes  GET /api/v1/kanban
//@access   Public


const getKanbans = asyncHandler(async (req, res, next) => {
  const kanbans = await Kanban.find()
  res
    .status(200)
    .json({ success: true, count: kanbans.length, data: kanbans })
})

// @ description GET single bootcamps
//@routes  GET /api/v1/bootcamps/:id
//@access   Public

const getKanban = asyncHandler(async (req, res, next) => {
  const kanban = await Kanban.findById(req.params.id)
  res.status(200).json({ success: true, data: kanban })
  if (!kanban) {
    return next(
      new ErrorResponse(`Plastic type not found with id of ${req.params.id}`, 404),
    )
  }
})

// @ description  create new bootcamp
//@routes  POST /api/v1/bootcamps/:id
//@access   Private

const createKanban = asyncHandler(async (req, res, next) => {
  const kanban = await Kanban.create(req.body)
  res.status(201).json({
    success: true,
    data: kanban,
  })
})

// @ description  update kanban
//@routes  PUT /api/v1/kanbans/:id
//@access   Private

const updateKanban = asyncHandler(async (req, res, next) => {
  const kanban = await Kanban.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!kanban) {
    return next(
      new ErrorResponse(`kanban not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: kanban })
})

// @ description  delete  new kanban
//@routes  DELETE /api/v1/kanbans/:id
//@access   Private

const deleteKanban = asyncHandler(async (req, res, next) => {
  const kanban = await Kanban.findByIdAndDelete(req.params.id)
  if (!kanban) {
    return next(
      new ErrorResponse(`kanban not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: {} })
})

module.exports = {
   getKanban,
   getKanbans,
   createKanban, 
   deleteKanban,
   updateKanban
    
  }
  