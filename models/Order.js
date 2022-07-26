const mongoose = require('mongoose')
const slugify = require('slugify');

const OrderSchema = new mongoose.Schema(
  {
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    orderNumber: {
      type: String,
      required: [true, "Merci d'entrer un numero de commande"],
      maxlength: [20, 'Le numéro de commande doit contenir au maximum 20 caractères'],
    },
  quantity: {
      type: Number,
    },
    orderDays: Number,

    status: {
      type: String,
      required: true,
      enum: [ 
        'traitement','depart', 'en cours', 'livree' ],
    },
    orderDate: {
      type: Date,
      required: true,
      min: '2022-01-01',
      max: '2100-01-01',
    },
    supplierDate: {
      type: Date,
      default: null,
      min: '2022-01-01',
      max: '2100-01-01',
    },
    deliveryDate: {
        type: Date,
        default: null,
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
// Calcule le nombre de jours ecouler depuis la demande
OrderSchema.pre('save', function (next) {
    if(this.deliveryDate === null) {

    this.orderDays = Math.round(
         (Date.now() - new Date(this.orderDate).getTime()) /
           (1000 * 3600 * 24),
       )
    }else {
        this.orderDays = Math.round(
              ( new Date(this.deliveryDate) - new Date(this.orderDate).getTime()) /
               (1000 * 3600 * 24),
           )

    }
  next()
})



module.exports =  mongoose.model('Order', OrderSchema);
