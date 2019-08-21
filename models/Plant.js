const mongoose = require('mongoose')


const plantSchema = new mongoose.Schema({
  name: { type: String, required: 'Please provide a {PATH}', unique: true },
  image: {type: String, required: 'Please provied a {PATH}'},
  daysToMaturation: {type: Number, required: 'Please provide a {PATH}'},
  germination: { type: Number, required: 'Please provide a {PATH}'},
  potSize: { type: Number, required: 'Please provide a {PATH}'},
  spacing: { type: Number, required: 'Please provide a {PATH}'},
  sowUnderGlass: { type: Boolean, required: 'Please provide a {PATH}' },
  sowUnderDirectSunlight: { type: Boolean, required: 'Please provide a {PATH}' },
  propagator: { type: Boolean, required: 'Please provide a {PATH}' },
  seedPeriod: { type: [String],  required: 'Please provide a {PATH}' },
  harvestPeriod: { type: [String], required: 'Please provide a {PATH}' },
  destroyedBy: {type: [String], required: 'Please provide a {PATH}'}
})

module.exports = mongoose.model('Plant', plantSchema)
