const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
  {
    status: {
      // Array of strings
      type: String,
      required: true,
      enum: ['A traiter', 'Archivé'],
    },
    ArchivedDate: {
      type: Date,
      required: true,
      min: '2022-01-01',
      max: '2100-01-01',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Order', OrderSchema)
