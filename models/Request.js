const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema(
  {
    kanban: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kanban',
    },
    status: {
      type: String,
      required: true,
      enum: ['a traiter', 'archive'],
    },
  },
  { timestamps: true },
)

// call get

module.exports = mongoose.model('Request', RequestSchema)
