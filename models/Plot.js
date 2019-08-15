const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 380 },
  rating: { type: Number, min: 1, max: 5, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

const plotSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  plotType: { type: String, required: true, enum: ['Allotment', 'Private Plot', 'Community Garden'] },
  image: { type: String, required: true },
  streetAddress: { type: String, required: true },
  postCode: { type: String, required: true },
  latitude: { type: Number,  required: true },
  longitude: { type: Number, required: true },
  sizeInMeters: { type: Number},
  numOfSlots: {type: Number},
  slotsAvailable: {type: Boolean, default: false},
  facilities: { type: [String], required: true },
  costInvolved: {type: Boolean, default: false},
  costPerAnnum: {type: Number},
  ConditionsForUse: {type: [String]},
  Volunteer: {type: Boolean, default: false},
  comments: [ commentSchema ],
  primaryContactName: {type: String},
  primaryContactEmail: {type: String},
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})
module.exports = mongoose.model('Plot', plotSchema)
