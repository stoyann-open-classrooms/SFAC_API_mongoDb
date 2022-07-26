const mongoose = require('mongoose')
const slugify = require('slugify')

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Vous devez charger un logo ou une photo de profil'],
    },
    designation: {
      type: String,
      required: [true, "Merci d'entrer un nom de produit"],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    refference: {
      type: String,
      required: [true, "Merci d'entrer une refference"],
      unique: true,
      trim: true,
      maxlength: [10, 'Name can not be more than 50 characters'],
    },
    slug: String,
    rupture: Boolean,
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)

// Create  order slug from the order number
ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.deliveryDate, { lower: true })
  next()
})
// Create boolean rupture stock
ProductSchema.pre('save', function (next) {
 if(this.stock  <= 0 ){
    this.rupture = true
} else {
    this.rupture = false 
 }
  next()
})

module.exports = mongoose.model('Product', ProductSchema)
