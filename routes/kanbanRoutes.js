const express = require('express')
const router = express.Router()

//controllers
const { getKanban, createKanban, updateKanban, deleteKanban, getKanbans } = require('../controllers/kanbanController')



router.route('/').get(getKanbans).post( createKanban)
router
  .route('/:id')
  .get(getKanban)
  .put( updateKanban)
  .delete( deleteKanban)

module.exports = router
