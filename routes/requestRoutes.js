const express = require('express')
const router = express.Router()

//controllers
const { getRequests, createRequest, getRequest, updateRequest, deleteRequest } = require('../controllers/requestController')



router.route('/').get(getRequests).post( createRequest)
router
  .route('/:id')
  .get(getRequest)
  .put( updateRequest)
  .delete( deleteRequest)

module.exports = router
