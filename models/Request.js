const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ['a traiter', 'archive'],
    },
    requestDate: {
      type: Date,
      min: '2022-01-01',
      max: '2100-01-01',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Order', OrderSchema)
