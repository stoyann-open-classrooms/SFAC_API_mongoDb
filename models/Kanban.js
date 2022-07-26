const mongoose = require('mongoose')
 const slugify = require('slugify');


const KanbanSchema = new mongoose.Schema(
  {
  
    slug: String,
    uid_nfc: {
      type: String,
      required: [true, "Vous devez rentrer un identifiant"],
      maxlength: [10, 'Description can not be more than 10 characters'],
    },
  quantity: {
      type: Number,
      required: true,
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
