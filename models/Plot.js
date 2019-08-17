const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 380 },
  rating: { type: Number, min: 1, max: 5, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

const plotSchema = new mongoose.Schema({
  name: { type: String, required: 'Please provide a {PATH}', unique: true },
  plotType: { type: String, required: 'Please provide a {PATH}', enum: ['Allotment', 'Private Plot', 'Community Garden'] },
  image: { type: String, required: 'Please provide a {PATH}' },
  streetAddress: { type: String, required: 'Please provide a {PATH}' },
  postCode: { type: String, required: 'Please provide a {PATH}' },
  latitude: { type: Number,  required: 'Please provide a {PATH}' },
  longitude: { type: Number, required: 'Please provide a {PATH}' },
  numOfSlots: {type: Number},
  slotsAvailable: {type: Boolean, default: false},
  bioWasteAccepted: {type: Boolean, default: false},
  facilities: { type: [String], required: 'Please provide a {PATH}' },
  costInvolved: {type: Boolean, default: false},
  costPerAnnum: {type: Number},
  ConditionsForUse: {type: [String]},
  volunteer: {type: Boolean, default: false},
  comments: [ commentSchema ],
  primaryContactName: {type: String, required: 'Please provide a {PATH}'},
  primaryContactEmail: {type: String, required: 'Please provide a {PATH}'},
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  toJSON: { virtuals: true }
})

plotSchema.virtual('averageRating')
  .get(function getAverageRating() {
    if(!this.comments) return null
    return this.comments.reduce((total, comment) => comment.rating + total, 0) / this.comments.length
  })

module.exports = mongoose.model('Plot', plotSchema)
