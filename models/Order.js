const mongoose = require('mongoose')
const slugify = require('slugify');


const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: [true, "Merci d'entrer un numero de commande"],
      maxlength: [50, 'Name can not be more than 50 characters'],
    },

    quantity: {
      type: Number,
    },
    status: {
      // Array of strings
      type: String,
      required: true,
      enum: ["Fournisseur", "En cours", "Reçue"],
    },
    orderDate: {
      type: Date,
      required: true,
      min: '2022-01-01',
      max: '2100-01-01',
    },
    supplierDate: {
      type: Date,
      min: '2022-01-01',
      max: '2100-01-01',
    },
    deliveryDate: {
      type: Date,
      min: '2022-01-01',
      max: '2100-01-01',
    },
  },
  { timestamps: true },
)

// Create  order slug from the order number
OrderSchema.pre('save', function (next) {
  this.slug = slugify(this.orderNumber, { lower: true })
  next()
})

module.exports = mongoose.model('Order', OrderSchema)
