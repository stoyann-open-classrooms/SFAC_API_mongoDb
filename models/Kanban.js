const mongoose = require('mongoose')
 const slugify = require('slugify');


const KanbanSchema = new mongoose.Schema(
  {

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },

    slug: String,
   
    uid_nfc: {
      type: String,
      required: [true, "Vous devez rentrer un identifiant pour ce kanban."],
      maxlength: [10, "L'identifiant ne peut pas contenir plus de 10 caractères."],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
   
  },
  { timestamps: true },
)

// Create  Kanban slug from the uid
KanbanSchema.pre('save', function (next) {
  this.slug = slugify(this.uid_nfc, { lower: true })
  next()
})

module.exports = mongoose.model('Kanban', KanbanSchema)
